import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        const currentUser = users[0];

        const passerUsers = users.filter((user) => user._id !== currentUser._id);
        const prompt = `
        STRICTLY OUTPUTS JSON FORMAT
        Find the most matching users for the main users from the other users list. Both lists are provided in json format. Provide two additional fields in the response json. One field denotes the matching order and the other field contains a very brief explanation (5 words max) for the match.

        Main user: ${currentUser}

        Other users: ${passerUsers}

        `;

        console.log(prompt);

        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Act as a relevant match finder for a given user profile and list of other profiles"
            },
            {
              role: "user",
              content: prompt 
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        });

        const parsedResponse = JSON.parse(response.choices[0].message.content || "{}");    
        console.log(parsedResponse);
        res.status(200).json({ success: true, data: parsedResponse });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case "DELETE":
      try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (!deletedUser) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}