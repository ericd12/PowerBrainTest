
import axios from 'axios';
import '../../App.css';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Column from './programBoard/column';
import React, { Component} from "react";
import { DragDropContext } from "react-beautiful-dnd";
// import ReactDOM from "react-dom";


const Container = styled.div`
    width: 100%;
    overflow: inherit;
    margin-left: 3%;
`;

const Form = styled.form`
    width: 90%;   
`

const Button = styled.input`
  margin-top: 10px;
    margin-right: 1%;
    font-weight: 500;
    color: white;
`



export default class CreateProgram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            columns: {
                "column-1": {
                name: "Track List",
                items: [],
                },
                "column-2": {
                name: "Program List",
                items: [],
                },
            },
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/tracks/").then(response => {
            this.setState(prev => {
                const copy = { ...prev };
                const { columns } = copy;
                copy.tracks = response.data;

                // const [firstColumnId] = Object.keys(columns);

                columns["column-1"].items = [
                    ...copy.columns["column-1"].items,
                    ...response.data,
                ];
                
                return copy;
            });
        });
    }
    
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.tracks)

    const program = {
        programinfo: this.state.columns["column-2"].items,
    };
           
    axios.post("http://localhost:5000/programs/add", program).then(res => {
        console.log(res.data);
        console.log(program);
        this.setState(prev => {
            return {
            ...prev,
            columns: {
                "column-1": {
                name: "Track List",
                items: prev.tracks,
                },
                "column-2": {
                name: "Program List",
                items: [],
                }
            },
            };
        });
        });
    };
    
    render() {
        return (
            <div>
            <Container>
                <h1>Create Program</h1>     
                <Button className="btn btn-primary" type="submit" form='submit-program' value="Create Program"/> 
                <Button className="btn btn-warning" type="submit" value="Edit Program" disabled/>
                <Button className="btn btn-danger" type="submit" value="Delete Program" disabled/>   
                <Form id='submit-program' onSubmit={this.onSubmit} /* id="createForm" */>
                <DragDropContext
                    onDragEnd={({ source, destination }) => {
                    if (!destination) {
                        return;
                    }

                    if (source.droppableId !== destination.droppableId) {
                        this.setState(prev => {
                        const sourceColumn = prev.columns[source.droppableId];
                        const destColumn = prev.columns[destination.droppableId];
                        const sourceItems = [...sourceColumn.items];
                        const destItems = [...destColumn.items];
                        const [removed] = sourceItems.splice(source.index, 1);
                        destItems.splice(destination.index, 0, removed);
                        return {
                            ...prev,
                            columns: {
                            ...prev.columns,
                            [source.droppableId]: {
                                ...sourceColumn,
                                items: sourceItems,
                            },
                            [destination.droppableId]: {
                                ...destColumn,
                                items: destItems,
                            },
                            }
                        };
                        });
                    } else {
                        this.setState(prev => {
                        const column = prev.columns[source.droppableId];
                        const copiedItems = [...column.items];
                        const [removed] = copiedItems.splice(source.index, 1);
                        copiedItems.splice(destination.index, 0, removed);
                        return {
                            ...prev,
                            columns: {
                            ...prev.columns,
                            [source.droppableId]: {
                                ...column,
                                items: copiedItems,
                            },
                            }
                        };
                        });
                    }
                    }}
                >
                    {Object.entries(this.state.columns).map(([id, column]) => {
                    return <Column {...{ ...column, id, key: id }} />;
                    })}
                    
                </DragDropContext>
                </Form>
            </Container>
            </div>
        );
    }
}



