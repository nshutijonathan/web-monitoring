import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Form,
    Modal,
    Row,
    Spinner,
} from "react-bootstrap";

const API_URL = "http://localhost:4000/api/v1/websites/";

function Websites() {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", url: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchWebsites = async () => {
    try {
      const {
        data: { data: websites },
      } = await axios.get(API_URL);

      const websitesWithStatus = await Promise.all(
        websites.map(async ({ id, ...website }) => {
          const {
            data: {
              data: { status },
            },
          } = await axios.get(`${API_URL}${id}/status`);
          return { ...website, id, status };
        })
      );

      setWebsites(websitesWithStatus);
      setLastChecked(new Date());
    } catch (error) {
      console.error("Error fetching websites:", error);
      return error.message;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites();
    const interval = setInterval(fetchWebsites, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setWebsites(websites.filter((website) => website.id !== id));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting website:", error);
      setError(error.message);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateUrl(formData.url)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const data = await axios.post(API_URL, formData);
      setFormData({ name: "", url: "" });
      setSuccess(data.data.message);
      setShowModal(false);
      fetchWebsites();

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      if (error.status === 409) {
        setError("Website name or URL already exists.");
      } else {
        setError("Error adding website. Please try again..");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", url: "" });
    setError("");
    setSuccess(false);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Websites Monitor({websites.length})</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Website
        </Button>
      </div>

      {success && (
        <Alert
          variant="success"
          className="mb-3"
          dismissible
          onClose={() => setSuccess(false)}
        >
          Operation completed successfully!
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <small className="text-muted">
            Last checked: {lastChecked.toLocaleTimeString()}
          </small>
        </div>
        <Button variant="outline-primary" size="sm" onClick={fetchWebsites}>
          Refresh
        </Button>
      </div>

      {websites.length === 0 ? (
        <Alert variant="info">
          No websites are being monitored. Add one to get started!
        </Alert>
      ) : (
        <Row>
          {websites.map((website) => (
            <Col key={website.id} lg={6} className="mb-3">
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title>{website.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {website.url}
                      </Card.Subtitle>
                      <Badge
                        bg={website.status === "online" ? "success" : "danger"}
                      >
                        {website.status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(website.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Website Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Enter website name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Website URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
                placeholder="https://example.com"
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Website
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Websites;