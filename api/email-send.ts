import { NowRequest, NowResponse } from "@now/node";
import dotenv from "dotenv";
import * as postmark from "postmark";

dotenv.config();

const client = new postmark.ServerClient(
  process.env.POSTMARK_API_TOKEN as string
);

export default (req: NowRequest, res: NowResponse) => {
  try {
    const { address, contact, name, time } = req.body;

    client.sendEmail({
      From: "no-reply@sewercam.net",
      To: process.env.TO_EMAIL,
      Subject: "Sewercam Booking Request",
      HtmlBody: `${name} @ ${contact} for ${address} on ${time}.`,
      TextBody: `${name} @ ${contact} for ${address} on ${time}.`,
      MessageStream: "outbound",
    });

    return res.status(200).json({ status: 200, time: Date.now() });
  } catch (error) {
    return res.status(400).end(error);
  }
};
