import React from "react";
import {Card,Button, Badge} from 'react-bootstrap'

function BoardList() {
    return (
        <>
            <h2>Board List</h2>
            <hr />
            <Card>
                <Card.Header>Board 1
                    <Badge variant="primary">10</Badge>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary" className="mr-2">View</Button>
                    <Button variant="success" className="mr-2">Edit</Button>
                    <Button variant="danger" className="mr-2">Delete</Button>
                </Card.Body>
            </Card>
        </>
    );
}
export default BoardList;
