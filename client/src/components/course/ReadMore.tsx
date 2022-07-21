import {useState, Fragment} from 'react';

interface ReadMoreType {
    text: string | string[];
}

const ReadMore = ({ text}: ReadMoreType) => {
    const [more, setMore] = useState(false);

    const toggleReadMore = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation();
      setMore(!more);
    };

    let content = [];

    if(typeof(text) === 'object') {
      let len = more? text.length : 2;
      for(let i = 0; i < len; i++) {
        content.push(<Fragment key={i}> {text[i]} <br/> </Fragment>);
      }
    }
    else 
      content.push(<span key="text"> {more? text : text.slice(0, 100)}</span>)

    return (
    <>
      {content}
      <span onClick={toggleReadMore} style={{color:'#307ABB', cursor:'pointer'}}>
        {more? " show less" : "... read more"}
      </span>
    </>
    );
  };

  export default ReadMore;