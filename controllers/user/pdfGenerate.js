const User = require('../../models/User');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
var path = require('path');



async function pdf() {
    try {
        const users = await User.find();

        const html = await ejs.renderFile(path.join(__dirname, '../../views/users.ejs'), { users });
        const browser = await puppeteer.launch(
            {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        );
        const page = await browser.newPage();
        await page.setContent(html);
        let pdf = await page.pdf({
            format: "A4",
            displayHeaderFooter: true,
            printBackground: true,
        });
        await browser.close();
        const buffer = Buffer.from(pdf);

        return buffer

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = pdf;


// app.get('/download-pdf', async (req, res) => {

// });

