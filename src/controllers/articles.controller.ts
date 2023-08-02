import axios from "axios";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import logger from "../common/logger";
import * as articlesService from "../services/articles.service";

const createUser = async (req: Request, res: Response) => {
  const url =
    "https://o327725.invisionservice.com/api/core/members?key=65d8e0a9d6e9f5e5b9a41bab08961489";

  try {
    const payload = req.body;
    const body = {
      name: payload.name,
      email: payload.email,
      password: "Ninja@123",
      group: {
        id: 8,
        name: "Vip",
        formattedName: "<span style='color:#f44336'>Vip</span>",
      },
      registrationIpAddress: "",
      secondaryGroups: [],
      customFields: [],
      validated: "",
      rawProperties: [{}],
    };

    const transporter = nodemailer.createTransport({
      service: "outlook", // Substitua pelo provedor de email desejado
      auth: {
        user: "manoel_ico@hotmail.com", // Substitua pelo seu endereço de email
        pass: "aQbP!@12", // Substitua pela sua senha de email
      },
    });
    const mailOptions = {
      from: "Manoel Carvalho<manoel_ico@hotmail.com>", // Remetente
      to: "manoelmecat@gmail.com", // Destinatário
      subject: "Ninja BR - Boas vindas",
      html: `
      <h2>Olá ${payload.name}, segue seus dados de acesso.</h2>
      <h3>Email: ${payload.email} </h3>
      <h3>Senha: Ninja@123 </h3>
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
      axios
        .post(url, body)
        .then((response) => {
          console.log("Resposta do servidor:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação:", error.message);
        });

      res.status(200).send({ cod: "Ok" });
    }
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).send(e.message);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const data = await articlesService.getAll();

    res.status(data.statusCode).send(data.body);
  } catch (e: any) {
    logger.error(e.message);

    res.status(500).send(e.message);
  }
};

const getById = async (req: Request, res: Response) => {
  const data = await articlesService.getById(req);

  res.status(data.statusCode).json(data.body);
};

export { createUser, getAll, getById };
