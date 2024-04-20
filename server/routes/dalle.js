import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { Configuration, OpenAIApi} from 'openai';
dotenv.config();

const router = express.Router();


const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

const getImages = async()=>{
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: "a painting of a beautiful sunset over the ocean",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    })
  }
}

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await fetch('https://api.openai.com/v1/images', options) 
    const data = await response.json();
    res.status(200).json({ data })
    console.log(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;