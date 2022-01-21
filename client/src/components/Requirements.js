import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import CourseCard from './CourseCard'
import { Popover,OverlayTrigger,Button } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import ItemTypes from '../assets/ItemTypes';
import './style.css'

const Requirements = ({major, onDrop}) => {
    const courses = major.courses;
    const requirement = major.requirement;
    const addedCourses = major.addedCourses;

    let index = 0
    console.log("requirement");
    const [{}, dropRef] = useDrop(() => ({
        accept: ItemTypes,
        drop: (item, monitor) => onDrop(item.item, 0),
      })); 

    function renderCol(){  
        let columns = []
        index++
        while(index < requirement.length && requirement[index][1] === "True"){
            let courseId =  requirement[index][0]
            
            if(courses[courseId] != undefined){
                if(courses[courseId].quarter !== 0){
                    columns.push(<Col className="mt-2" key = {courseId}>
                        <OverlayTrigger
                            trigger="click"
                            placement='bottom'
                            overlay={
                            <Popover id={courseId}>
                                <Popover.Header as="h4">{courseId}</Popover.Header>
                                <Popover.Body> {courses[courseId].description} </Popover.Body>
                                <Popover.Body> {courses[courseId].prereqString} </Popover.Body>
                                <Popover.Body> {courses[courseId].restriction} </Popover.Body>
                            </Popover>
                            }
                            >
                            <Button variant="outline-secondary" size ='sm'>{courseId}</Button>
                        </OverlayTrigger>
                        </Col>)
                }else{

                columns.push(<Col className="mt-2" key = {courseId}>
                    <CourseCard 
                        item={courses[courseId]}
                        index={courseId}
                        buttonClass="edit-button" > 
                    </CourseCard>
                    </Col>)
                }
            }
            else
                columns.push(<Col className="mt-2" key = {courseId}>{courseId}</Col>)
            index++

        }
        return columns
    }

    function renderRequirements(){        
        var rows = [];

        if(addedCourses.length > 0) {
            rows.push(<div key = "addCourses"> 
                <h5>Additional Courses:</h5> 
                <Row xs={3} md={4} className="mt-2"> {addedCourses.map(course => (<Col className="mt-2" key = {course}>
                    <CourseCard 
                        item={courses[course]}
                        index={course}
                        buttonClass="edit-button" > 
                    </CourseCard>
                    </Col>))
                }</Row>
          </div> )
        }

        rows.push(<h5 key="header">Required Courses:</h5>)
        for(index; index < requirement.length; index++){
            let i = index 
            if(requirement[index][1] === "False"){
                rows.push(<div key = {requirement[i][0] + i}> 
                                <h6>{requirement[i][0]}</h6> 
                                <Row xs={3} md={4} className="mt-2"> {renderCol()}</Row>
                          </div>)
                index--;
            }
        }
        return rows
    }
    return (
        <div className="requirement mt-4" ref = {dropRef} >
            {renderRequirements()}
        </div>
    )
}

export default Requirements