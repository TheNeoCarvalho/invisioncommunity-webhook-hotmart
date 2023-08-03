import axios from "axios";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import qs from "qs";
import logger from "../common/logger";
import generateRandomPassword from "../helpers/index";

const createUser = async (req: Request, res: Response) => {
  //generate password with 8 digits
  // "https://ninjabr.digital/api/index.php?/core/members?key=57c561c01e8f9f7f672954b91c951675";
  const key = "65d8e0a9d6e9f5e5b9a41bab08961489";

  const urlGet = `https://o327725.invisionservice.com/api/core/members?key=${key}`;
  const urlPost = `https://o327725.invisionservice.com/api/core/members?key=${key}`;

  const generatedPassword = generateRandomPassword(8);

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "manoel_ico@hotmail.com",
      pass: "aQbP!@12",
    },
  });

  try {
    const payload = req.body;

    const mailOptionsUpdateUser = {
      from: "Ninja BR<manoel_ico@hotmail.com>",
      to: `Manoel Carvalho <manoelmecat@gmail.com>`,
      // to: `${payload.name} <${payload.email}>`,
      subject: " Ninja BR - Parabéns, Você agora é um ninja",
      html: `
        <p>Caro Ninja</p>
        <p style="text-align: justify">Parabéns por adquirir o vip do nosso fórum ninjabr! Você acaba de
        entrar para um grupo seleto de pessoas que têm acesso a
        conteúdos exclusivos, benefícios especiais e muito mais. Esperamos
        que você aproveite ao máximo sua experiência vip e que participe
        ativamente da nossa comunidade.</p>

        <p>Obrigado por escolher o ninjabr e por nos apoiar!</p>
      
        Atenciosamente,
        <br>A equipe do Ninjabr
        `,
    };

    const { data } = await axios.get(urlGet, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });

    const objetoEncontrado = data.results.find(
      (user: any) => user.email === payload.email
    );

    if (objetoEncontrado) {
      data.results.map(async (user: any) => {
        if (user.email === payload.email) {
          await axios.post(
            `https://o327725.invisionservice.com/api/core/members/${user.id}/secgroup/8?key=${key}`,
            {
              headers: { "content-type": "application/x-www-form-urlencoded" },
            }
          );
        }
      });

      transporter.sendMail(mailOptionsUpdateUser, (error, info) => {
        if (error) {
          console.error("Erro ao enviar o email:", error);
        } else {
          console.log("Email enviado com sucesso:", info.response);
        }
      });
    } else {
      const body = {
        name: payload.name,
        email: payload.email,
        password: generatedPassword,
        group: [3, 8], //Grupo a ser adicoinado
        registrationIpAddress: "",
        secondaryGroups: [],
        customFields: [],
        validated: "",
        rawProperties: [{}],
      };

      const mailOptionsNewUser = {
        from: "Ninja BR<manoel_ico@hotmail.com>", // Remetente - email Hotmail
        to: `Manoel Carvalho <manoelmecat@gmail.com>`,
        // to: `${payload.name} <${payload.email}>`,
        subject: " Ninja BR - Parabéns, Você agora é um ninja",
        html: `
        <p>Caro Ninja</p>
        <p style="text-align: justify">Parabéns por adquirir o vip do nosso fórum ninjabr! Você acaba de
        entrar para um grupo seleto de pessoas que têm acesso a
        conteúdos exclusivos, benefícios especiais e muito mais. Esperamos
        que você aproveite ao máximo sua experiência vip e que participe
        ativamente da nossa comunidade.</p>

        <p>Segue seus dados de acesso.</p>
        Acesse o Forúm: <a href="https://ninjabr.digital/">https://ninjabr.digital</a>
        <br>Email: ${payload.email}
        <br>Senha: ${generatedPassword}
        <br><span style="color: #f00; font-size: 10px">*Ao logar no Forúm, altere sua senha.</span>

        <p>Obrigado por escolher o ninjabr e por nos apoiar!</p>

        Atenciosamente,
        <br>A equipe do Ninjabr
        `,
      };

      if (payload.status === "approved") {
        transporter.sendMail(mailOptionsNewUser, (error, info) => {
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
          url: urlPost,
        };
        axios(options);

        res.status(200).send({ cod: "Ok" });
      }
    }
  } catch (e: any) {
    logger.error(e.message);
    res.status(500).send(e.message);
  }
};

export { createUser };

