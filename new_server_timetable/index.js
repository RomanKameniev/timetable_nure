import puppeteer from 'puppeteer';


const ParseNure = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://cist.nure.ua/ias/app/tt/f?p=778:2:1432140176241438');
    //page.once('load', () => console.log('Page loaded!'));
    const links = await page.$$('a')

    let l1 = await getValue(links)
    await links[l1.indexOf('ПЗПІ-17-1')].click()

    const links2 = await page.$$('a')
    let l2 = await getValue(links2)
    console.log('l1 length -> ', l1.length, 'l2 length => ', l2.length)
    // console.log('l2 =>', l2)
    await links2[l2.indexOf('Формат HTML')].click()

    let pages = await browser.pages();
    console.log('pages= >', pages.length)
    let r = pages[0]

    let temp = await r.$('table')

    console.log('table => ', temp)


    /*  await pages[0].evaluate(() => {
          let elements = document.getElementsByClassName("MainTT");
          /*for (let element of elements)
              element.click();
        console.log('el => ',elements)
      });
  
      // get the last element of the array (third in my case) and do some 
      // hucus-pocus to get it as JSON...
      /*const aHandle = await pages[0].evaluateHandle(() => document.body);
  
      const resultHandle = await pages[0].evaluateHandle(body =>
          body.innerHTML, aHandle);
          console.log('res => ', resultHandle)
      // get the JSON value of the page.
      let jsonValue = await resultHandle.jsonValue();
          console.log('json => ',jsonValue)
  */
    //       let l = await page.$x("a[contains(text(), 'ПЗПІ-17-1')]", el => console.log(el));
    //page.$$eval('ПЗПІ-17-1', el => console.log(el))
    //<a style="white-space:nowrap;" href="#" onclick="javascript:IAS_ADD_Group_in_List('ПЗПІ-17-1',6283365)"></a>
    await browser.close();
}

async function getValue(links) {
    const linkValues = []

    for (let a = 0; a < links.length; a++) {
        let value = await links[a].getProperty('innerText')
        let linkText = await value.jsonValue();
        const text = getText(linkText);
        //      console.log('text => ', text, a)
        linkValues.push(text)
    }
    return linkValues
}

function getText(linkText) {
    linkText = linkText.replace(/\r\n|\r/g, "\n");
    linkText = linkText.replace(/\ +/g, " ");

    // Replace &nbsp; with a space 
    var nbspPattern = new RegExp(String.fromCharCode(160), "g");
    return linkText.replace(nbspPattern, " ");
}


ParseNure()