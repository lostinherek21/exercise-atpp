import React from 'react';
import MDView from '../components/MDView';
import MDWrite from '../components/MDWrite';
import "./style.scss";
const Page = () => {
    return (<div className='main-container'>
      <main>
        <MDWrite />
        <MDView />
        <span className='divider'></span>
      </main>
    </div>);
};
export default Page;
//# sourceMappingURL=index.js.map