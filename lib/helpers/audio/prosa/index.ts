import https from 'https'

export async function request(url: string, method: string, { headers = {}, json = null }: any) {
    return new Promise<any>((resolve, reject) => {
      const req = https.request(url, {
        method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          ...headers
        }
      }, (res) => {
        let data = ""
        res.on("data", chunk => data += chunk)
        res.on("end", () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data))
          } else {
            reject(new Error(`Status: ${res.statusCode}, Body: ${data}`))
          }
        })
      })
  
      req.on("error", reject)
      if (json) req.write(JSON.stringify(json))
      req.end()
    })
  }