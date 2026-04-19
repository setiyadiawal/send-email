import nodemailer from "nodemailer";

export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { full_name, email } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "perekrutan@kojac.id",
        pass: "Perekrutan123!"
      }
    });

    await transporter.sendMail({
      from: '"KOJAC Recruitment" <perekrutan@kojac.id>',
      to: email,
      subject: "Pendaftaran KOJAC Berhasil",
      html: `
        <h2>Terima kasih ${full_name}</h2>
        <p>Pendaftaran kamu sudah kami terima.</p>
        <p>Tim KOJAC akan segera menghubungi kamu.</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}