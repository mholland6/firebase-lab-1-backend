import { ObjectId } from "mongodb";

export default interface Post {
  _id?: ObjectId;
  title: string;
  author: string;
  postText: string;
}