import Header from './layout/Header';
import {TabPanelComponent} from "../features/tabPanel/tabPanel";
import ReloadDialog from "./layout/ReloadDialog";

export default function App() {
  return (
    <div className='container'>
        <ReloadDialog />
        <Header/>
      <div className="container-view">
          <TabPanelComponent />
      </div>
    </div>
  );
};
