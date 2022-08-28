import {Body, Controller, Get, Path, Delete, Patch, Post, Query, Route, SuccessResponse, Put,} from "tsoa";
import { User } from "./user";
import User1 from '../schema/userSchema' 
import { FlattenMaps, LeanDocument} from "mongoose";

  
  
  @Route("users")
  export class UsersController extends Controller {
    
    //------------------------------------------getting User----------------------------------------------//
    @SuccessResponse("201", "fetched")
    @Get("{userId}")
    public async getUserReq(
      @Path() userId: string,
      @Query() name?: string
    ):Promise<{
      status:number,
      data: {
        name:string,
        email:string,
        empid:string,
        designation:string
      } ,
      message:string
    }> {
      const user = (await User1.findById(userId));
      const user2= {
          name:user.name,
          email:user.email,
          empid:user.empid,
          designation:user.designation
      }
      return {status:200, data:user2, message:'fetched'}      
    }
    //------------------------------------------getting all Users----------------------------------------------//


    @SuccessResponse("201","fetched")
    @Get()
    public async getallUserReq():Promise<{
      status:number,
      data:unknown,
      message:string
    }>{
      const users = await User1.find();
      return {status:200, data:users, message:'fetched'}  
    }

    //------------------------------------------Creating User----------------------------------------------//  
    @SuccessResponse("201", "Created")
    @Post()
    public async createUserReq(
      @Body() requestBody: User
    ) :Promise<{
      status:number,
      data:{
        name:string,
        email:string,
        empid:string,
        designation:string
      },
      message:string
    }>{
      this.setStatus(201); 

      const user =  new User1(requestBody);
      const userCreated ={
        name:user.name,
        email:user.email,
        empid:user.empid,
        designation:user.designation
      }
      console.log(user);     

       await user.save();

      return {status:200, data:userCreated,message:'created'};
    }

    //------------------------------------------Deleting User----------------------------------------------//
    @SuccessResponse("201", "Deleted")
    @Delete('{userId}')
    public async deleteUserReq(userId: string):Promise<{
      status:number,
      data:FlattenMaps<LeanDocument<{
        name?: string;
        email?: string;
        empid?: string;
        designation?: string;
    }>>,
      message:string
    }>{
      const user = (await User1.findByIdAndDelete(userId)).toJSON();
      return {status:200, data:user, message:'deleted'}
    }

    //------------------------------------------Updating User----------------------------------------------//
    @SuccessResponse("201", "Updated") 
    @Put('{userId}')
    public async updateUserReq(
      @Path() userId: string,
      @Body() requestBody: User
    ) :Promise<{
      status:number,
      data:FlattenMaps<LeanDocument<{
        name?: string;
        email?: string;
        empid?: string;
        designation?: string;
    }>>,
      message:string
    }>{
      this.setStatus(201); 

      const user =  (await User1.findByIdAndUpdate(userId, { $set: requestBody }, { new: true })).toJSON();
      console.log(user);
      
      return {status:200, data:user,message:'updated'};
    }
  }

