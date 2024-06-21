const User = require("../models/user.model")

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
    }
  };
  
const registerUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(200).json({ message: "Username already exists" });
      }
  
      const newUser = await User.create({
        username,
        password,
      });
  
      // Generate access and refresh tokens
      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
          newUser._id
        );
  
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          secure: true,
          sameSite: "strict",
        });
    
        // Send access token along with refresh token
        res.json({ accessToken, refreshToken });
  
  
    } catch (error) {
      console.log(error);
    }
  };
  
const loginUser = async (req, res) => {
      try {
          const {username, password} = req.body;
  
          const existingUser = await User.findOne({ username })
  
          if (!existingUser) {
              return res.json({message: "user doesn't exist"})
          }
  
          const isPasswordValid = await existingUser.isPasswordCorrect(password);
          if (!isPasswordValid) {
            return res.json({ message: "Invalid username or password" });
          }
          
          // Generate access and refresh tokens
       const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
          existingUser._id
        );
  
          // Set refresh token as a cookie
      res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    
    
    
      res.json({accessToken});
    
      } catch (error) {
          console.log(error)
      }
  }
  
  const testRoute = async (req, res) => {
      try {
          const data = await User.find()
          res.json(data)
      } catch (error) {
          console.log(object)
      }
  }
  
  const refreshAccessToken = async (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.jwt_secret);
      const user = await User.findById(decoded._id);
  
      if (!user || user.refreshToken !== token) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  };

  const validate_token = async (req, res) => {
    try {
      res.status(200).json({ valid: true })
    } catch (error) {
      console.log(error)
    }
  }
  
  
  module.exports = {
      registerUser,
      loginUser,
      testRoute,
      refreshAccessToken,
      validate_token
  }