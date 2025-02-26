import { Route, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Badge, Card, Collapse, Table } from "react-bootstrap";
import AddQuiz from "./AddQuiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faClose, faCircleXmark, faCircleCheck, faGear, faXmark, faCheck, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS
import { Switch } from "@mui/material";
import AddQuestion from "./AddQuestion";
import Cookies from "js-cookie";  
import "../../../assets/css/styleQuiz.css";

// États manquants

const backendURL = "http://localhost:5001/api";

const QuizAdmin = () => {
    const [Quizselected, setQuizselected] = useState(null);
const [reloadquiz, setReloadquiz] = useState(false);
const [seTerroChronoval, setSeTerroChronoval] = useState(null);



    const history = useNavigate();
    let { idModule } = useParams();

    const [user, setUser] = useState(null);
    const [module, setModule] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);
    
    const [openAdd, setopenAdd] = useState(false);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [quizSelected, setQuizSelected] = useState(false);
    const [editQuiz, setEditQuiz] = useState(false);
    const [keySelected, setKeySelected] = useState(false);
    const [checked, setChecked] = useState(false);
    const [erroChronoval, setErroChronoval] = useState(false);
// Fonctions manquantes
const ShowAddQuestion = () => {
    console.log("ShowAddQuestion function called");
  };
  
  const confirDeleteQuestion = () => {
    console.log("confirDeleteQuestion function called");
  };
  
  const confirmDelete = () => {
    console.log("confirmDelete function called");
  };
    // Charger l'utilisateur depuis les cookies
    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("User avec cookie:", parsedUser);
            setUser(parsedUser);
        }
    }, []);

    // Charger le module
   
useEffect(() => {

 
      // Charger les quiz
      const fetchQuizzes = async () => {
          try {
              console.log("Fetching quizzes...");

              const response = await fetch(`${backendURL}/quiz/findall`, {
                  method: 'GET',
               
              });

              // Vérification de la réponse
              console.log("Response object:", response);

              if (!response.ok) {
                  throw new Error("Échec du chargement des quiz");
              }

              // Parser la réponse en JSON
              const data = await response.json();
              console.log("Data received:", data); // Vérifier ce que vous recevez

              // Mettre à jour l'état avec les données reçues
              setQuizzes(data);
          } catch (err) {
              setError(err.message);
          }
      };

      fetchQuizzes();

  
}, []);

    // Charger les quiz
    useEffect(() => {
      const fetchQuizzes = async () => {
       
          try {
              const response = await fetch(`${backendURL}/quiz/findall`, {
                  method: 'GET',
             
              });
  
              // Affichage de la réponse brute pour déboguer
              console.log("Response object:", response);
  
              // Vérifier que la réponse est correcte
              if (!response.ok) {
                  throw new Error("Échec du chargement des quiz");
              }
  
              // Parser la réponse en JSON
              const data = await response.json();
              console.log("Data received:", data); // Vérifier ce que vous recevez
  
              // Mettre à jour l'état avec les données reçues
              setQuizzes(data);
          } catch (err) {
              setError(err.message);
          }
      };
  
      fetchQuizzes();
      if (reloadquiz) {
        // Fetch quizzes again or perform any other action to reload
        // Assuming `fetchQuizzes` is the function that loads quizzes
        fetchQuizzes();
        // Reset reloadquiz to false after the quizzes are fetched
        setReloadquiz(false);
    }
  }, [user],[reloadquiz]);
  

    // Vérifier si l'utilisateur est propriétaire du module
    useEffect(() => {
        if (module && user && module.idowner !== user.id) {
            let url = `/module/${idModule}/allcours`;
            history.push(url);
        }
    }, [module, user, idModule, history]);

    // Gestion de la mise à jour du quiz
    const handleChange = async (event) => { 
        setChecked(event.target.checked);

        if (!event.target.checked) {
            try {
             

                const response = await fetch(`${backendURL}/quiz/update`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                  },
                    body: JSON.stringify({
                        id: quizSelected._id,
                        chrono: false,
                        chronoVal: 0
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to update quiz");
                }

                // Recharger les quiz après mise à jour
                const updatedQuizzes = quizzes.map(q =>
                    q._id === quizSelected._id ? { ...q, chrono: false, chronoVal: 0 } : q
                );
                setQuizzes(updatedQuizzes);
            } catch (err) {
                console.error("Error updating quiz:", err.message);
            }
        }
    };
    const handleKeyPresstitle = async (event) => {
        if (event.key === 'Enter') {
          try {
            // Vérifier si l'utilisateur est défini
          
      
            const response = await fetch(`${backendURL}/quiz/update`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
            },
              body: JSON.stringify({
                id: Quizselected._id,
                title: event.target.value
              })
            });
      
            if (!response.ok) {
              throw new Error("Failed to update quiz title");
            }
      
            reloadquiz();
          } catch (err) {
            console.error("Error updating quiz title:", err.message);
          }
        }
      };
      
      const handleKeyPresschrono = async (event) => {
        if (event.key === 'Enter') {
          if (event.target.value > 0) {
            try {
              // Vérifier si l'utilisateur est défini
         
              const response = await fetch(`${backendURL}/quiz/update`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  id: Quizselected._id,
                  chrono: checked,
                  chronoVal: event.target.value
                })
              });
      
              if (!response.ok) {
                throw new Error("Failed to update quiz chrono value");
              }
      
              reloadquiz();
              seTerroChronoval(false);
            } catch (err) {
              console.error("Error updating quiz chrono value:", err.message);
            }
          } else {
            seTerroChronoval(true);
          }
        }
      };
      
      async function AddQuestionEvent(data, responses, code, language) {
        try {
          // Vérifier si l'utilisateur est authentifié
      
      
          // Construire le corps de la requête
          const requestBody = {
            texte: data.texte,
            QuestionType: data.QuestionType,
            Responses: responses,
          };
      
          // Ajouter `code` et `language` seulement si `code` n'est pas vide
          if (code !== "") {
            requestBody.code = code;
            requestBody.language = language;
          }
      
          const response = await fetch(`${backendURL}/quiz/addQuestion/${Quizselected._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
           },
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            throw new Error("Failed to add question");
          }
      
          const q = await response.json();
          setQuizselected(q);
        } catch (err) {
          console.error("Error adding question:", err.message);
        }
      }

      async function addQuizFn(data, timer) {
        try {
       
      
          // Construire le corps de la requête
          const requestBody = { title: data.title };
      
          // Ajouter `chrono` et `chronoVal` si `timer` est activé
          if (timer) {
            requestBody.chrono = true;
            requestBody.chronoVal = data.chrono;
          }
      
          const response = await fetch(`${backendURL}/quiz/1/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
           },
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            throw new Error("Failed to create quiz");
          }
      
          setReloadquiz(true);
          setopenAdd(false);
        } catch (err) {
          console.error("Error creating quiz:", err.message);
        }
      }      
  
 return (
    
     <div>{!module&&quizzes&&
    <div>
    <div class="row mt-5 mx-auto" >
     <div class="col-4 me-3">
      {openAdd==false&&
     <a class="btn  col-12 btncustom mb-3" onClick={()=>setopenAdd(true)}>Add Quiz</a>
      }
      {openAdd==true&&
     <a class="btn  col-12 btncustom mb-3" onClick={()=>setopenAdd(false)}>  <FontAwesomeIcon icon={faClose}/> close </a>
      }
     <Collapse in={openAdd}>
     <Card className="mb-3">
  <Card.Body>
    
     <AddQuiz QuizEvent={addQuizFn}></AddQuiz>
   
</Card.Body>
<Card.Footer  style={{cursor: "pointer"}} onClick={()=>setopenAdd(false)} className="d-flex justify-content-center"> <FontAwesomeIcon icon={faArrowUp}/>
</Card.Footer>

     </Card>
     </Collapse>
     
     <a class="btn  col-12 btncustom mb-3" onClick={()=>{
       history.push("/module/"+idModule+"/QuizResults");
     }}>Show Results</a>
     <Collapse in={ShowAddQuestion}>
     <Card className="mb-3">
       <Card.Header>{Quizselected&& <Card.Title style={{"textAlign":"center"}}>{Quizselected.title}</Card.Title>}</Card.Header>
  <Card.Body>
     <h6>Questions :</h6>
     <div id="accordion">

  { Quizselected&&
      Quizselected.Questions.map((question, index) => (

        <div class="card my-3" key={index}>
        <div id={"heading"+index} class="card-header" >
          <h5 class="mb-0">
            <div class="row">
              <div class="col-10" data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="true" aria-controls={"collapse"+index}  style={{color:"black",cursor: "pointer"}}>{question.texte}</div>
              <div class="col ms-4"> <FontAwesomeIcon size="sm" icon={faTrash} onClick={()=>confirDeleteQuestion(Quizselected._id,question._id)}   /> </div>

            </div>
          </h5>
        </div>
        <div id={"collapse"+index} class="card-body collapse" aria-labelledby={"heading"+index} data-parent="#accordion">
          {question.QuestionType=="Radio"&&
          question.Responses.map((reponse,index)=>(
          <div class="form-group" key={index}>
          <input type="radio"  name={question.texte}/>{ reponse.texte} <FontAwesomeIcon icon={faXmark} color={"red"} hidden={!reponse.correct} ></FontAwesomeIcon><FontAwesomeIcon icon={faCheck} color={"green"} hidden={reponse.correct} ></FontAwesomeIcon>
          </div>))}
          {question.QuestionType=="CheckBox"&&
          question.Responses.map((reponse,index)=>(
          <div class="form-group" key={index}>
          <input type="checkbox"  name={reponse.texte}/>{ reponse.texte} {reponse.correct.toString()}  
          </div>))}
          {question.QuestionType=="Select"&&
          <select  class="form-control">  
 {
    question.Responses.map((reponse,index)=>(
        <option value={ reponse.texte}>{ reponse.texte} {reponse.correct.toString()} </option>    
      ))
 }         
          </select>
}
        </div>
        </div>


    ))

    
  }
</div>
</Card.Body>
<Card.Footer  style={{cursor: "pointer"}} onClick={()=>setShowAddQuestion(false)} className="d-flex justify-content-center"> <FontAwesomeIcon icon={faArrowUp}/>
</Card.Footer>

     </Card>
     </Collapse>
     </div>
     <div class="col-7">
     <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Title</th>
      <th>Link</th>
      <th>Duration</th>
      <th style={{textAlign:"center"}}>Actions</th>
    </tr>
  </thead>
  <tbody>
  {
                        
                        quizzes.map((quiz, index) => (
                        editQuiz==false  || editQuiz==true && index!=setKeySelected ?(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{quiz.dateQuiz.substring(0, 10)}</td>
                            <td>{quiz.title}</td>
                            <td><a href={"/studentQuiz/"+quiz._id}>Preview</a></td>
                            <td>{quiz.chrono==false&& <FontAwesomeIcon icon={faCircleXmark} color={"red"}></FontAwesomeIcon>}
                            {quiz.chrono==true&&
                             <FontAwesomeIcon icon={faCircleCheck} className="me-3" color={"green"}></FontAwesomeIcon>  }
                             {quiz.chrono==true&&
                             quiz.chronoVal + " Minutes" }
                            </td>
                            <td style={{textAlign:"center"}}>
                            <a style={{color:"#4284f5",cursor: "pointer"}}  className="me-3" onClick={()=>{setShowAddQuestion(true);
                               setQuizselected(quiz)
                               console.log(Quizselected)}}> <FontAwesomeIcon icon={faGear}/> Manage Question </a> 
                            <FontAwesomeIcon icon={faEdit} className="me-3" onClick={()=>{setQuizselected(quiz);
                            setKeySelected(index);
                            setEditQuiz(true);
                            setChecked(quiz.chrono)
                            }}/>
                            <FontAwesomeIcon icon={faTrash} className="me-3" onClick={()=>confirmDelete(quiz._id)}/>

                            </td>
                            </tr>
                        ):(<tr key={index}>
                          <td>{index + 1}</td>
                          <td> {quiz.dateQuiz.substring(0, 10)}</td>
                          <td><input className="form-control"type="texte" name="title" defaultValue={quiz.title} onKeyPress={handleKeyPresstitle}/></td>
                          <td><a href={"/studentQuiz/"+quiz._id}>Preview</a></td>
                          <td> <Switch   checked={checked}  onChange={handleChange} ></Switch> Timer (Minutes) 
                          {checked==true&&
                          <input class="form-control" type="number" placeholder="minutes" defaultValue={quiz.chronoVal} onKeyPress={handleKeyPresschrono}/>
                           }
                           {erroChronoval==true&&checked==true&&
                           <div class="alert alert-danger" role="alert">
                           Timer must be greater than 0
                           </div>
                           }
                      
                          </td>
                          <td style={{textAlign:"center"}}>
                          <FontAwesomeIcon icon={faClose} className="me-3" onClick={()=>{setQuizselected(null);
                          setKeySelected(-1);
                          setEditQuiz(false);
                         
                          }}/>
                    
                          </td>
                          </tr>)


                        ))
        }
  </tbody>
</Table>

<Collapse in={ShowAddQuestion}>
     <Card className="mb-3">
  <Card.Body>
     <AddQuestion AddQuestionEvent={AddQuestionEvent}></AddQuestion>
</Card.Body>
<Card.Footer  style={{cursor: "pointer"}} onClick={()=>setShowAddQuestion(false)} className="d-flex justify-content-center"> <FontAwesomeIcon icon={faArrowUp}/>
</Card.Footer>

     </Card>
     </Collapse>
         </div>
        </div>
        </div>}
        </div>);

}
export default QuizAdmin; 