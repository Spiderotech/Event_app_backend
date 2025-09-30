const Verifyemail = async (email, repositories) => {
    console.log(`Verifying email: ${email}`);

    try {
        const user = await repositories.userexistemail(email);

        if (user) {
            // If user exists, return login method and navigation instruction
            console.log(`Email exists with login method: ${user.loginMethod}`);
            return {
                status: 'exists',
                message: 'Navigate to login',
                loginMethod: user.loginMethod, // 'email' or 'google'
            };
        } else {
            // If user does not exist, return status to register
            console.log('Email does not exist. Navigate to register.');
            return {
                status: 'not_exists',
                message: 'Navigate to register',
            };
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        throw new Error('Unable to verify email. Please try again.');
    }
};

export default Verifyemail;
