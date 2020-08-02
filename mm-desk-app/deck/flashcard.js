import React, {useState } from 'react';
import { Card } from 'react-bootstrap';
export default function FlashCard(props){
    const [side, setSide] = useState(false);

    return(
        <div>
            <Card onClick={() => setSide(!side)}
            style={{ width: '18rem'},{"border-style":"solid"}}>
                <Card.Body>
                    <Card.Title>
                        {side ? props.FrontTitle : props.BackTitle}
                    </Card.Title>
                    <Card.Text>
                        {side ? props.FrontContent : props.BackContent}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};