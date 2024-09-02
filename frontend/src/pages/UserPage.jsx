import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";


const UserPage = () => {
  return (
    <>
   <UserHeader/>
   <UserPost likes={1200}  replies={401} postImg={"/post1.png"} postTitle="Lets talk about threads"/>
   
   <UserPost likes={450}  replies={123} postImg={"/post2.png"} postTitle="Good tutorial"/>
   <UserPost likes={990}  replies={96} postImg={"/post3.png"} postTitle="Faboulous person"/>
   <UserPost likes={541}  replies={41}  postTitle="This is my first post"/>
  
   </>
  );
}

export default UserPage;
