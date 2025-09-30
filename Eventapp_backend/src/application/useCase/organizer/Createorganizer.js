import organizerdata from "../../../entities/organizer/organizerdata.js";

const Createorganizer = async (fullname,email,password,fcmToken,repositories,authService) => {
  console.log(fullname,email,password,fcmToken);
  
    try {
      const hashPassword = await authService.bcryptpassword(password);
      const userDetails = organizerdata(fullname,email,hashPassword);
      const newuser = await repositories.create(userDetails);

      const Id=newuser._id

      await repositories.updateFCMToken(Id,fcmToken);
  
      const isuser = {
        userId:newuser._id,
        userName:newuser.name,
        userEmail:newuser.email,
      };
      console.log(isuser);
  
      const accessToken = await authService.generateAccessToken(isuser);
  
      return { status: true, isuser, accessToken };
    } catch (error) {
      console.error("Error creating new user:", error.message);
      return { status: false, message: error.message };
    }
  };
  
  export default Createorganizer;