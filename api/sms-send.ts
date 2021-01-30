import dotenv from "dotenv";
import { NowRequest, NowResponse } from "@now/node";

dotenv.config();

const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

export default (req: NowRequest, res: NowResponse) => {
  try {
    const { address, contact, name, time } = req.body;

    return client.messages
      .create({
        body: `${name} @ ${contact} for ${address} on ${time}`,
        from: process.env.TWILIO_NUMBER,
        to: process.env.CLIENT_NUMBER,
      })
      .then(() => res.status(200).end())
      .catch((error: Error) => res.status(400).end(JSON.parse(error.message)));
  } catch (error) {
    return res.status(400).end(JSON.parse(error.message));
  }
};
