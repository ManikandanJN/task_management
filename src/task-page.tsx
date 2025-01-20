import React, { useState, useCallback } from "react";
import Header from "./components/header/header";
import BoardView from "./components/board-view/board-view";
import ListViewComp from "./components/list-view/list-view";
import Footer from "./components/footer";

const TaskPage: React.FC = () => {
  const [tabSelected, setTabSelected] = useState<number>(1);
  const [animate, setAnimate] = useState<boolean>(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  const handleTabChange = useCallback((selectedTab: number) => {
    setAnimate(true);
    setTabSelected(selectedTab);
  }, []);

  return (
    <div className="bg-white overflow-y-auto h-screen sm:px-8 pb-8 app-vertical-scrollbar">
      <Header onTabChange={handleTabChange} />
      {tabSelected === 1 ? (
        <div
          className={`${animate ? "animate-slideLeft" : ""}`}
          onAnimationEnd={() => setAnimate(false)}
        >
          <ListViewComp
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
          />
        </div>
      ) : (
        <BoardView animate={animate} setAnimate={setAnimate} />
      )}
      {selectedTaskIds?.length > 0 && (
        <Footer
          selectedTaskIds={selectedTaskIds}
          setSelectedTaskIds={setSelectedTaskIds}
        />
      )}
    </div>
  );
};

export default TaskPage;
