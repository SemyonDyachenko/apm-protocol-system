import { useState } from "react"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/esm/Table"
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom"
import { $api } from "@/api/instance"
import { API } from "@/api/api"

type Props = {}

interface League {
  name: string | null
  country: string | null
  description: string | null
  president: string | null
  level: string | null
}

const ControlPanel = (props: Props) => {
  const [name, setName] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [president, setPresident] = useState<string>("")
  const [level, setLevel] = useState<string>("")
  const [leagues, setLeagues] = useState<Array<League>>()
  const getLeagues = async () => {
    $api
      .get("leagues/")
      .then((response) => response.data)
      .then((data) => {
        setLeagues(data)
      })
  }

  const createLeague = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let data: League = {
      name: name,
      country: country,
      description: description,
      president: president,
      level: level,
    }

    let formData = new FormData()
    formData.append("name", name)
    formData.append("country", country)
    formData.append("description", description)
    formData.append("president", president)
    formData.append("level", level)
    console.log(data)

    await $api
      .post("leagues/", formData)
      .then((response) => response.data)
      .then((data) => console.log(data))
      .then((error: Error | any) => console.log(error.message))
  }

  return (
    <div style={{ width: "800px" }}>
      <Button
        style={{ marginLeft: "25px", marginTop: "10px" }}
        variant="success"
      >
        <Link
          style={{ color: "white", padding: "5px", textDecoration: "none" }}
          to="/"
        >
          Go Back
        </Link>
      </Button>
      <Button
        style={{ marginLeft: "25px", marginTop: "10px" }}
        variant="primary"
        onClick={getLeagues}
      >
        Обновить
      </Button>
      <h3 style={{ padding: "25px" }}>Добавить лигу в базу данных</h3>
      <Form style={{ width: "400px", padding: "25px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Название</Form.Label>
          <Form.Control
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Название лиги"
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Страна</Form.Label>
          <Form.Control
            onChange={(event) => setCountry(event.target.value)}
            type="text"
            placeholder="Страна"
            value={country}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            onChange={(event) => setDescription(event.target.value)}
            as="textarea"
            type="text"
            placeholder="Описание"
            value={description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Президент</Form.Label>
          <Form.Control
            onChange={(event) => setPresident(event.target.value)}
            type="text"
            placeholder="И.Ф.О"
            value={president}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Уровень</Form.Label>
          <Form.Control
            onChange={(event) => setLevel(event.target.value)}
            type="text"
            placeholder="Pro or amateur"
            value={level}
          />
        </Form.Group>
        <Button onClick={createLeague} variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Страна</th>
            <th>Описание</th>
            <th>Президент</th>
            <th>Уровень</th>
          </tr>
        </thead>
        <tbody>
          {leagues &&
            leagues.map((element, index) => (
              <tr key={index}>
                <td>{element.name}</td>
                <td>{element.country}</td>
                <td>{element.description}</td>
                <td>{element.president}</td>
                <td>{element.level}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ControlPanel
