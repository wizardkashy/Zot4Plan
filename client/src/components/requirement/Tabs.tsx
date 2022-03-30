import {useState} from 'react';
import GETab from './GETab';
import MajorTab from './MajorTab';
import AddTab from './AddTab';

function Tabs () {
  const [tab, setTab] = useState<number>(1);

  return (
    <div className='shadow-0 round-15'>
      <ul className="flex tab-panel m-0">
        <li className={'flex justify-center item-center tab ' + (tab === 1?"tab-active":"bg-grey")} onClick={()=>setTab(1)}>
          Major Requirement
        </li>
        <li className={'flex justify-center item-center bg-grey tab ' + (tab === 2?"tab-active":"bg-grey")} onClick={()=>setTab(2)}>
          General Education
        </li>
        <li  className={'flex justify-center item-center bg-grey tab ' + (tab === 3?"tab-active":"bg-grey")} onClick={()=>setTab(3)}>
          + Courses
        </li>
      </ul>
      {tab === 1 && <MajorTab/>}
      {tab === 2 && <GETab/>}
      {tab === 3 && <AddTab/>}
      <div style={{height: '12px'}}></div>
    </div>
  );
}

export default Tabs 