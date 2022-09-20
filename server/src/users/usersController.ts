import { Body, Controller, Get, Path, Delete, Patch, Post, Query, Route, SuccessResponse, Put, } from "tsoa";
import { User } from "./user";
import User1 from '../schema/userSchema'
import { FlattenMaps, LeanDocument } from "mongoose";
const redis = require("redis");
import { createClient } from 'redis';



let redisClient: { on: (arg0: string, arg1: (e: any) => void) => void; connect: () => any; get: (arg0: string) => any; set: (arg0: string, arg1: string, arg2: { EX: number; NX: boolean; }) => any; del: (arg0: string, arg1: string, arg2: { EX: number; NX: boolean; }) => any; }

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (e: any) => console.error(`Error : ${e}`));

  await redisClient.connect();
})();

//const redisClient = redis.createClient(redisPort)  
let isCached = false;
let user;


@Route("users")
export class UsersController extends Controller {

  //------------------------------------------getting User----------------------------------------------//

  @SuccessResponse("201", "fetched")
  @Get("{userId}")
  public async getUserReq(
    @Path() userId: string,
    @Query() name?: string
  ): Promise<{
    status: number,
    data: {
      name: string,
      email: string,
      empid: string,
      designation: string
    },
    message: string
  }> {
    try {
      const cacheResults = await redisClient.get(userId);
      if (cacheResults) {
        isCached = true;
        user = JSON.parse(cacheResults);
        // console.log(isCached,user);
      } else {
        user = await User1.findById(userId);
        await redisClient.set(userId, JSON.stringify(user), {
          EX: 60,
          NX: true,
        });
        //console.log('----------',harsh);
      }

      // const user = (await User1.findById(userId));
      const user2 = {
        name: user.name,
        email: user.email,
        empid: user.empid,
        designation: user.designation
      }
      return { status: 200, data: user2, message: 'fetched' }
    }
    catch (err) {
      console.log(err)
    }
  }

  //------------------------------------------getting all Users----------------------------------------------//


  @SuccessResponse("201", "fetched")
  @Get()
  public async getallUserReq(): Promise<{
    status: number,
    data: unknown,
    message: string
  }> {
    let users
    try {
      const cacheResults = await redisClient.get('allUsers');
      if (cacheResults) {
        isCached = true;
        users = JSON.parse(cacheResults);
        // console.log(isCached,user);
      } else {
        users = await User1.find();
        await redisClient.set('allUsers', JSON.stringify(users), {
          EX: 60,
          NX: true,
        });
        //console.log('----------',harsh);
      }

      // const users = await User1.find();

      return { status: 200, data: users, message: 'fetched' }
    }
    catch (err) {
      console.log(err)
    }
  }

  //------------------------------------------Creating User----------------------------------------------//  
  @SuccessResponse("201", "Created")
  @Post()
  public async createUserReq(
    @Body() requestBody: User
  ): Promise<{
    status: number,
    data: {
      name: string,
      email: string,
      empid: string,
      designation: string
    },
    message: string
  }> {
    this.setStatus(201);


    const user = new User1(requestBody);

    const userCreated = {
      name: user.name,
      email: user.email,
      empid: user.empid,
      designation: user.designation
    }
    console.log(user);

    const newUser = await user.save();

    let newUserId = newUser._id.toString()
    //console.log('12345678987654321',myObjectIdString);

    await redisClient.set(newUserId, JSON.stringify(user), {
      EX: 60,
      NX: true,
    });

    return { status: 200, data: userCreated, message: 'created' };
  }

  //------------------------------------------Deleting User----------------------------------------------//
  @SuccessResponse("201", "Deleted")
  @Delete('{userId}')
  public async deleteUserReq(userId: string): Promise<{
    status: number,
    data: FlattenMaps<LeanDocument<{
      name?: string;
      email?: string;
      empid?: string;
      designation?: string;
    }>>,
    message: string
  }> {
    const user = (await User1.findByIdAndDelete(userId)).toJSON();
    await redisClient.del(userId, JSON.stringify(user), {
      EX: 60,
      NX: true,
    });
    return { status: 200, data: user, message: 'deleted' }
  }

  //------------------------------------------Updating User----------------------------------------------//
  @SuccessResponse("201", "Updated")
  @Put('{userId}')
  public async updateUserReq(
    @Path() userId: string,
    @Body() requestBody: User
  ): Promise<{
    status: number,
    data: FlattenMaps<LeanDocument<{
      name?: string;
      email?: string;
      empid?: string;
      designation?: string;
    }>>,
    message: string
  }> {
    this.setStatus(201);

    const updatedUser = (await User1.findByIdAndUpdate(userId, { $set: requestBody }, { new: true })).toJSON();
    console.log(updatedUser);

    await redisClient.set(userId, JSON.stringify(updatedUser), {
      EX: 60,
      NX: true,
    });

    return { status: 200, data: updatedUser, message: 'updated' };
  }
}

