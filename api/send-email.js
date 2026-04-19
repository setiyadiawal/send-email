import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

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

  try {
    await transporter.sendMail({
      from: '"KOJAC" <perekrutan@kojac.id>',
      to: email,
      subject: "Pendaftaran KOJAC Berhasil",
      html: `
        <h2>Terima kasih sudah mendaftar</h2>
        <p>Nama: ${full_name}</p>
        <p>Kami akan segera menghubungi Anda.</p>
      `
    });

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}