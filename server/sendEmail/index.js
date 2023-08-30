const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require("fs");

const sendEmail = async (emailAddress, pdfName) => {
  pathToAttachment = `./server/createPdf/${pdfName}.pdf`;
  attachment = fs.readFileSync(pathToAttachment).toString("base64");

  const msg = {
    to: emailAddress,
    from: {
      email: "brett@idevise.com",
      name: "Risky Terms Team",
    },
    subject: "Re: Here's Your Custom Risky Terms Website Report",
    text: "Open the PDF file to see the full report.",
    html: '<center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tbody><tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tbody><tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tbody><tr> <td> <!--[if mso]> <center> <table><tr><td width="600"> <![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center"> <tbody><tr> <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tbody><tr> <td role="module-content"> <p>Swap these terms on your website to mitigate liability!</p> </td> </tr> </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8186305f-9c7c-48ab-9cf8-872e5a4b4995" data-mc-module-version="2019-10-22"> <tbody> <tr> <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: right"><a href="https://cdn.mc-weblink.sg-mktg.com/weblink/MTY5MTU4NzkzNXxFVVBsdHVDRWRmT1lKc3dzUmR3MkRiWWFNQW1MNVFkazhacmluOHpqRGZaRHp0OEstbGJQWXRDUkFEWDZWV2VZRkhDYVNGcW1LdG5LRFUwTXo0UzlnVG1CYTdfUFp1SERMUHJLdl8xVTFFWGdCdThyUkxYYjRCSjFrYmVWM0lEYkNyR1dZMm5sdzh2REVrang0NGVBT2EwWXdqcmg2alBLVTFJVmk3cTQ1cUdZaHdtbnR6Zzl3VHJiWVZmVl93ODh4UmdYc3drcXhaLVVkblFxcFBlVFhFMEo0djg4U0VrbFRWWXZ5bm5oQk1ZNkRlVEx1cE92RndaMGprUGVsa1pCVV9PdFFBZWI3NG9KcmR3TEU3dVFzbTktekNSc1Mta1VmdVpuYUdrUG9kdDhuY2MyS2wwY0k4VnlETWlPai00S1RUT2J4WmI2UUh2NllIbW5BcUZUTlBjYzhpWHF0T1ZHU2xxMEotMVQ4Q2Q0aktZZ0RGR3puQ2phU1gxMko2SFFoV3Ywb3J5bVpnVDFTTFVESFE9PXzUvwF9IrgmM5FJLsqmLKlBEEwwZPOe3DIlW8nQjX_meA=="><u>View web version of this email</u></a>.&nbsp;</div><div></div></div></td> </tr> </tbody> </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="310f18f0-cf44-4c48-9cb3-99cf37315f0c"> <tbody> <tr> <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 5px;" valign="top" align="left"> <a href="https://bretts43.sg-host.com"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;" width="300" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/6159b4dceab68db6/d502bcae-96a7-4297-a254-6b673ee18b7a/522x126.png"></a></td> </tr> </tbody> </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="654cd807-c30a-4457-bcd0-d7bf5e8fe253" data-mc-module-version="2019-10-22"> <tbody> <tr> <td style="padding:18px 10px 18px 10px; line-height:20px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px"><strong>CONGRATULATIONS!</strong></span></div> <div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px">You just made another smart decision for your agency. The terms we look for on your website are some of the most common and repeated terms that have been used by customers and their attorneys in claims against insurance agencies.</span></div> <div style="font-family: inherit; text-align: inherit"><br></div> <div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px"><strong>WHY RISKY TERMS ARE A PROBLEM</strong></span><span style="font-size: 14px"><br> Using terms such as “best,” “expert,” “peace of mind,” “partner,” “comprehensive” and “personalized” are powerful and create emotion, but they also increase an agent’s duty owed to the customer by increasing the Standard of Care expected by the insured.</span></div> <div style="font-family: inherit; text-align: inherit"><br></div> <div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px"><strong>NEXT STEPS</strong></span></div> <div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px">1. Download and open the attached PDF report</span></div> <div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px">2. Review report and visit web pages to evaluate context and accuracy</span></div> <div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px">3. Share with your website manager to make suggested text changes</span></div> <div style="font-family: inherit; text-align: inherit"><br></div> <div style="font-family: inherit; text-align: inherit"><span style="font-size: 14px">Questions? </span><a href="mailto:brettsutch@gmail.com?subject=Risky Terms - Question Submission&amp;body="><span style="color: #0050ff; font-size: 14px"><u>Contact us</u></span></a><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space-collapse: preserve; text-wrap: wrap; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 14px"> or visit </span><a href="https://bretts43.sg-host.com"><span style="font-family: arial, helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space-collapse: preserve; text-wrap: wrap; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; color: #0050ff; font-size: 14px"><u>www.riskyterms.com</u></span></a><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space-collapse: preserve; text-wrap: wrap; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 14px">.</span><span style="font-size: 14px">&nbsp;</span></div><div></div></div></td> </tr> </tbody> </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b05c8733-ee13-4ea9-b75c-17091874395e"> <tbody> <tr> <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor=""> <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;"> <tbody> <tr> <td style="padding:0px 0px 1px 0px;" bgcolor="#9b9b9b"></td> </tr> </tbody> </table> </td> </tr> </tbody> </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="654cd807-c30a-4457-bcd0-d7bf5e8fe253.1" data-mc-module-version="2019-10-22"> <tbody> <tr> <td style="padding:18px 10px 18px 10px; line-height:15px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space-collapse: preserve; text-wrap: wrap; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 11px">This is intended to be used for general informational purposes only and is not to be relied upon or used for any particular purpose. This is not an exhaustive search tool and only contains some of the most common and repeated terms that have been used by customers and their attorneys in claims against insurance agencies. Risky Terms shall not be held responsible in any way for, and specifically disclaims any liability arising out of or in any way connected to, reliance on or use of any of the information contained, referenced, or shared herein. The information contained, referenced, or shared is not intended to constitute and should not be considered legal, accounting or professional advice, nor shall it serve as a substitute for the recipient obtaining such advice. The views expressed do not necessarily represent the views of Risky Terms and/or its subsidiaries and/or management and/or shareholders. The decision to implement the suggestions provided in the end user report is solely up to the end user. Risky Terms will in no way be involved in the implementation and/or content management of the end user’s website or digital properties. </span><span style="font-size: 11px">&nbsp;</span></div><div></div></div></td> </tr> </tbody> </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-size:12px; line-height:20px;">Risky Terms Team</p><p style="font-size:12px; line-height:20px;"><span class="Unsubscribe--senderAddress">313 Millers Ridge Ct</span>, <span class="Unsubscribe--senderCity">Pittsburgh</span>, <span class="Unsubscribe--senderState"></span> <span class="Unsubscribe--senderZip">15237</span></p></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="" target="_blank" style="">Unsubscribe</a> - <a href="http://u36381486.ct.sendgrid.net/asm/?user_id=36381486&amp;data=ELqp4SkMOhevkHkP8aR2G1CCc6n3_L6zITOQM6lEoF5oMDAwdTAwMF781_YxFiTDEtajFTKeZ4nORZMSom2gKDnI38YAHHF7xe0fEDCoMDZakBT9u2yhRFjBe02BZnSrZ3wZaBj1LKy1WHmyzk2fI9BHrMyu_ctHio3CldcyDRxtSuEbsQkG15JbSQwgjDM3nXM7GkuTvc8=" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> </center> <![endif]--> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> </center>',
    attachments: [
      {
        content: attachment,
        filename: "report.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
