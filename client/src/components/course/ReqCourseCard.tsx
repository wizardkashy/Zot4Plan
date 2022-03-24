import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store';
import Popup from './Popup';
import { Draggable } from 'react-beautiful-dnd';
import {memo} from 'react'
//import { removeCourseFromQuarter } from '../../features/ScheduleSlice'
//import Xmark from '../icons/Xmark';

interface courseType {
    droppableId: string;
    courseId: string;
    index: number;
}

function getStyle(style: any, snapshot: { isDropAnimating: any; }) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: '0.0001s',
    };
}

function ReqCourseCard({courseId, droppableId, index}: courseType) {

    const repeatability = useSelector(
        (state: RootState) => state.store.courses.byIds[courseId].repeatability)

    let isDraggable = true;
    if(repeatability === 0)
        isDraggable = false;

    //const dispatch = useDispatch();
    /*const submitRemoveCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
     
    }; */
  
    return (   
    <Draggable 
        key={droppableId + courseId} 
        draggableId={droppableId + courseId}
        isDragDisabled={!isDraggable} 
        index={index}
    >
        {(provided, snapshot) => (
            <>
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getStyle(provided.draggableProps.style, snapshot)}
                className="course-card w"
                >
                    <Popup id={courseId} showUnit={false} isCrossed ={!isDraggable}/>
            </div>

            {snapshot.isDragging && (
                <div className="card-box w">
                    <div className="courseId">{courseId}</div> 
                </div>
            )}
            
            </>
          )}
    </Draggable>
    )
}

export default memo(ReqCourseCard)