import userdatagoogle from "../../../entities/user/userdatagoogle.js";

const Googleauth = async (fullName, email, image, fcmToken, repositories, authService) => {
    try {
        console.log(`Authenticating Google user: ${email}`);

        // Check if the user exists
        const existingUser = await repositories.organizerexistemail(email);

        if (existingUser) {
            const isuser = {
                userId:existingUser._id,
                userName:existingUser.name,
                userEmail:existingUser.email,
              };

              const Id=existingUser._id
              await repositories.updateFCMToken(Id,fcmToken);
        
              const accessToken = await authService.generateAccessToken(isuser);
        
              return { status: true, isuser, accessToken };
        } else {
            console.log('User does not exist. Creating a new user...');
            const userDetails = userdatagoogle(fullName,email,image);

            // Create new user
            const newUser = await repositories.createorganizergoogle(userDetails);

            const Id=newUser._id

            await repositories.updateFCMToken(Id,fcmToken);

            const isuser = {
                userId:newUser._id,
                userName:newUser.name,
                userEmail:newUser.email,
              };
              console.log(isuser);
          
              const accessToken = await authService.generateAccessToken(isuser);
          
              return { status: true, isuser, accessToken };
        }
    } catch (error) {
        console.error('Error during Google authentication:', error);
        throw new Error('Google authentication failed. Please try again.');
    }
};

export default Googleauth;
