import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign  , verify} from "hono/jwt"
import {signupInput , signinInput , createPostInput , getBlogById , updatePostInput , deleteBlogById , deleteUserById} from "@rishabh_pandey/common_medium";
import { cors } from 'hono/cors'



//const prisma = new PrismaClient();

const app = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    JWT_SECRET : string,
    
  }
}>()

app.use(cors())

app.use("/api/v1/blog/*",async (c , next)=>{
  try {
    const body = await c.req.json();
    const username  = body.email;
    const token = body.token;

    if(token==null || token == ""){
      return c.json({
        status : 403,
        result : "token not found"
      })
    }

    const ver_res = await verify(token , c.env.JWT_SECRET);
    if(ver_res.email == username){
      await next();
      
    }
    console.log("from middleware");
    return c.json({
      result:"First signup for this"
    })
  } catch (error) {
    //@ts-ignore
    if(error.name == "JwtTokenInvalid"){
      return c.json({
        result : "First signup for this"
      })
    }
    return c.json({
      result : error
    })
  }
})



// app.get('/', async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   const data = await prisma.user.findMany();
//   const postData = await prisma.post.findMany();

//   return c.json({
//     data : data,
//     userCount : data.length,
//     dataPost : postData,
//     postCount : postData.length
//   })
// })



app.post('/api/v1/blog/image/get' , async (c) =>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //user email , token , password , id in the body
    const body  = await c.req.json();

    const data = await prisma.user.findUnique({
      where : {
        id : body.id
      }
    })

    return c.json({
      status : 200,
      imageFile : data
    })

  } catch (error) {
    return c.json({
      message : "error occured while fetching the image url",
      error : error
    })
  }
})

app.put('/api/v1/blog/images/upload' , async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    //user email , token , password , id and image url in the body
    const body  = await c.req.json();

    const imageUploaded = await prisma.user.update({
      where : {
        id : body.id
      },
      data : {
        imageUrl : body.imageUrl,
      }
    })

    //return c.body(body.imageUrl)

    return c.json({
      status : 200,
      response : "image uploaded successfully"
    })



  } catch (error) {
    return c.json({
      error : " there was a error while uploading the image",
      message : error
    })
  }
})

app.post('/api/v1/user/name' , async (c)=>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body  = await c.req.json();

    const result = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
    if(result == null){
      return c.json({
        status : 404,
        error : "User not found , Please create your account by signing up"
      })
    }

    return c.json({
      status : 200,
      response : result.name,
      userid : result.id,
      email : result.email
    })

  } catch (error) {
    return c.json({
      status : 500,
      response : error
    })
  }
})

app.post('/api/v1/blog/bulk',async (c)=>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany();
    const users = await prisma.user.findMany();

    return c.json({
      userList : users,
      posts : posts
    })
  } catch (error) {
    return c.json({
      result : error
    })
  }
})

app.post("/api/v1/blog/id",async (c)=>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // email , token and id of user is passed here for the author id column
    const body = await c.req.json();

    const {success} = getBlogById.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        result : "Invalid inputs" 
      })
    }

    const user = await prisma.post.findMany({
      where : {
        authorId : body.id
      }
    })

    return c.json({
      result : user
    })
  } catch (error) {
    return c.json({
      result : error
    })
  }
})

app.put("/api/v1/blog",async (c)=>{
  try {
    const prisma  = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // it takes email , token , post id , updated title , updated content in body
    const body = await c.req.json();

    const {success} = updatePostInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        result : "invalid input"
      })
    }

    const updatedPost = await prisma.post.update({
      where : {
        id : body.id
      },
      data : {
        title : body.title,
        content : body.content
      }
    })

    return c.json({
      result : "Updated successfully"
    })
  } catch (error) {
    return c.json({
      result : "Some error occurred while updating the blog"
    })
  }
})

app.post("/api/v1/blog",async (c)=>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // here email , token , title , content ,published , authorId(foriegn key whose value is the id from user table) will come from body
    const body = await c.req.json();

    const {success} = createPostInput.safeParse(body);

    if(!success) {
       c.status(411);
       return c.json({
        result : "wrong input"
       })
    }

    const postedBlog = await prisma.post.create({
      data :{
        title : body.title,
        content : body.content,
        published : body.published,
        authorId : body.authorId
      }
    })

    return c.json({
      result : "Blog posted successfully"
    })

  } catch (error) {
    return c.json({
      result : error
    })
  }
})

app.post("/api/v1/user/signin",async (c)=>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // token is passed in body from frontend which is stored in the local storage
    const body = await c.req.json();

    const {success} = signinInput.safeParse(body);

    if(!success){
      
      return c.json({
        status : 411,
        result : "Invalid inputs"
      })
    }
    
    // const token = body.token;
    // console.log(token);

    const result = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
    if(result == null){
      return c.json({
        status : 404,
        error : "User not found , Please create your account by signing up"
      })
    }

    //@ts-ignore
    const token = await sign({email:body.email},c.env.JWT_SECRET);

    const ver_res = await verify(token , c.env.JWT_SECRET);
    //const jwt_data = await decode(token);

    if(ver_res.email == body.email && result.password == body.password){
      return c.json({
        status : 200,
        token : token,
        result : "User is validated"
      })
    }
    else {
      return c.json({
        status : 401,
        res_email : ver_res.email,
        body_email : body.email,
        res_password : result.password,
        body_password : body.password,
        result : "Incorrect password"
      })
    }

    
  } catch (error) {
    return c.json({
      error : error
    })
  }

})

app.post("/api/v1/user/signup",async (c)=>{
  

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    // contains email , password and name will be optional field in the body
    const body = await c.req.json();

    const { success } =  signupInput.safeParse(body);

    if(!success){
      // c.status(411);
      return c.json({
        status : 411,
        result : "Invalid inputs"
      })
    }

    const user = await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name : body.name
      }
    })

    // //@ts-ignore
    // const token = await sign({email:body.email},c.env.JWT_SECRET);

    return c.json({
      status : 200,
      //token : token,
      user : user
    })
  } catch (error) {
    //@ts-ignore
    if(error.meta.target[0] === "email")
      {
        c.status(409);
        return c.json({
          error : error
        })
      }

    return c.json({
      error : error
    })
  }

})

app.delete("api/v1/blog/id" , async (c)=>{
  try {
    const prisma =  new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // this will take email , token, postid in the body
    const body = await c.req.json();

    const {success}  = deleteBlogById.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        result : "Invalid inputs"
      })
    }


    const deletedPost = await prisma.post.delete({
      where : {
        id : body.id
      }
    })

    return c.json({
      result : "Deleted Successfully"
    })

  } catch (error) {
    //@ts-ignore
    if(error.code == "P2025"){
      return c.json({
        result : "Post does not exist",
      })
    }
    return c.json({
      result : "Error while deleting",
      error : error
    })
  }
})

app.delete("api/v1/user/id" , async (c)=>{
  try {
    const prisma =  new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // this will take email , token, postid in the body
    const body = await c.req.json();

    const {success} = deleteUserById.safeParse(body);

    if(!success){
      c.status (411);
      return c.json({
        result : "Invalid inputs"
      })
    }

    const deletedPost = await prisma.user.delete({
      where : {
        id : body.id
      }
    })

    return c.json({
      result : "Deleted Successfully"
    })

  } catch (error) {
    //@ts-ignore
    if(error.code == "P2025"){
      return c.json({
        result : "User does not exist",
      })
    }
    return c.json({
      result : "Error while deleting",
      error : error
    })
  }
})

export default app
