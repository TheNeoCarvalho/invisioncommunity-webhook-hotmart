import axios from "axios";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import qs from "qs";
import logger from "../common/logger";
import generateRandomPassword from "../helpers/index";
const createUser = async (req: Request, res: Response) => {
  //generate password with 8 digits

  const url =
    // "https://ninjabr.digital/api/index.php?/core/members?key=57c561c01e8f9f7f672954b91c951675";
    "https://o327725.invisionservice.com/api/core/members?key=65d8e0a9d6e9f5e5b9a41bab08961489";

  const generatedPassword = generateRandomPassword(8);
  try {
    const payload = req.body;
    const body = {
      name: payload.name,
      email: payload.email,
      password: generatedPassword,
      group: [3, 7], //Grupo a ser adicoinado
      registrationIpAddress: "",
      secondaryGroups: [],
      customFields: [],
      validated: "",
      rawProperties: [{}],
    };

    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "manoel_ico@hotmail.com",
        pass: "aQbP!@12",
      },
    });
    const mailOptions = {
      from: "Ninjas BR<manoel_ico@hotmail.com>", // Remetente - email Hotmail
      to: `${payload.name} <${payload.email}>`,
      subject: "Ninja BR - Bem vindo ao Clãn",
      html: `
      <span style="display: block; font-size: 18px">Olá ${payload.name}, segue seus dados de acesso.</span>
      <span style="display: block ; font-size: 16px">Email: ${payload.email} </span>
      <span style="display: block ; font-size: 16px">Senha: ${generatedPassword} </h3>
      `,
    };

    if (payload.status === "approved") {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Erro ao enviar o email:", error);
        } else {
          console.log("Email enviado com sucesso:", info.response);
        }
      });
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(body),
        url,
      };
      axios(options);

      res.status(200).send({ cod: "Ok" });
    }
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).send(e.message);
  }
};

export { createUser };

