import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [url, setUrl] = useState<string>('https://jsonplaceholder.typicode.com/todos')
  const [protocol, setProtocol] = useState<string>('GET')
  const [response, setResponse] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [headerKey, setHeaderKey] = useState<string>('')
  const [headerValue, setHeaderValue] = useState<string>('')
  const [headers, setHeaders] = useState<{ [key: string]: string }>({})
  const [body, setBody] = useState<string>('')

  const handleAddHeader = () => {
    setHeaders({ ...headers, [headerKey]: headerValue })
    setHeaderKey('')
    setHeaderValue('')
    console.log(headers)
  }

  const handleRemoveHeader = (key: string) => {
    const newHeaders = { ...headers }
    delete newHeaders[key]
    setHeaders(newHeaders)
  }

  const handleSend = async () => {
    if (protocol === 'GET' || protocol === 'DELETE') {
      const response = await fetch(url, {
        method: protocol,
        headers,
      })
      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
      setStatus(response.status.toString())
    }

    if (protocol === 'POST' || protocol === 'PUT') {
      const response = await fetch(url, {
        method: protocol,
        headers,
        body,
      })
      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
      setStatus(response.status.toString())
    }
  }

  return (
      <div className="container">
        <div>
          <div>
            <div>
              <label htmlFor="url">URL</label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="protocol">Protocol</label>
              <select
                id="protocol"
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
            <div>
              <label htmlFor="headers">Headers</label>
              <div>
                <input
                  type="text"
                  placeholder="Key"
                  aria-label="Key"
                  aria-describedby="basic-addon2"
                  value={headerKey}
                  onChange={(e) => setHeaderKey(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  aria-label="Value"
                  aria-describedby="basic-addon2"
                  value={headerValue}
                  onChange={(e) => setHeaderValue(e.target.value)}
                />

                <div>
                  <button
                    type="button"
                    onClick={handleAddHeader}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                {Object.keys(headers).map((key) => (
                  <div key={key}>
                    <span>{key}</span>
                    <span>{headers[key]}</span>
                    <button
                      onClick={() => handleRemoveHeader(key)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="body">Body</label>
              <textarea
                id="body"
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <button onClick={handleSend}>
              Send
            </button>
          </div>
          <div>
          
            <div>
              <label htmlFor="response">Response</label>
              <textarea
                style={{ height: '300px', width: '100%'  }}
                id="response"
                rows={3}
                value={response}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                value={status}
                readOnly
              />
            </div>


          </div>
        </div>
      </div>
  )
}







export default App
