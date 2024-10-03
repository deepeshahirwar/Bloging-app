import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
  
// Database service
export class Service{

    client = new Client()
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    } 

    // for creating post 
    async createPost({title, slug, image, userId,
        content, status }){
      
            try{
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId, 
                    slug, 
                    {
                        title,
                        image,
                        userId,
                        content,
                        status,
                        
                    }
                   
                );
            } 
            catch(error){
                console.log("Appwrite service :: createPost :: error", error);
            }


    } 

    // for updating post
    async updatePost(slug, {title, image,
        content, status }){
      
            try{
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId, 
                    slug, 
                    {
                        title,
                        image,
                        content,
                        status,
                        
                    }
                   
                );
            } 
            catch(error){
                console.log("Appwrite service :: updatePost :: error", error);
            }
}  


// for deleting post
async deletePost(slug){
    try{
         await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId, 
            slug
        ); 
    return true;
    } 
    catch(error){
        console.log("Appwrite service :: deletePost :: error", error);
     return false;
    } 
} 

// for getting post
async getPost(slug){
    try{
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId, 
            slug
        );  
    } 
    catch(error){
        console.log("Appwrite service :: getPost :: error", error);
        return false; 
    }


}  

 // for getting all posts
 async getAllPosts(queries = [Query.equal("status", 
    "active")]){

    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
         queries,
      );    
    }
    catch(error){
        console.log("Appwrite service :: getAllPosts :: error", error);
     return false;
    }
 }  

 // for file uploading service 
 async uploadFile(file){
    try{
        return await this.storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
    }
    catch(error){
        console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
 } 

 // delete file
 async deleteFile(fileId){
    try{
         await this.storage.deleteFile(
            conf.appwriteBucketId,
            fileId
        ); 
        return true;
    }
    catch(error){
        console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
 } 

 // file preview 
  getFilePreview(fileId){
    
     return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
  
 }



}

 
const service = new Service();
export default service;