import { NowRequest, NowResponse } from "@now/node";
import dotenv from "dotenv";
import { PhloClient } from "plivo";

dotenv.config();

const client = new PhloClient(
  process.env.PLIVO_AUTH_ID,
  process.env.PLIVO_AUTH_TOKEN,
  {}
);

export default (req: NowRequest, res: NowResponse) => {
  try {
    const { address, contact, name, time } = req.body;

    return client
      .phlo(process.env.PLIVO_PHLO_ID)
      .run({
        from: process.env.FROM_NUMBER,
        to: process.env.TO_NUMBER,
        message: `${name} @ ${contact} for ${address} on ${time}.`,
      })
      .then(() => res.status(200).end())
      .catch((error: Error) => res.status(400).end(error));
  } catch (error) {
    return res.status(400).end(error);
  }
};
