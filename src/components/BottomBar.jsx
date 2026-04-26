const layoutOptions = [1, 2, 3];

const BottomBar = ({
  viewMode,
  onViewModeChange,
  gridColumns,
  isMobile = false,
  onGridColumnsChange,
}) => {
  const availableLayoutOptions = isMobile ? [1] : layoutOptions;

  return (
    <div className="fixed bottom-3 left-2 z-50 text-[10px] tracking-[0.04em] sm:left-5">
      <div className="flex max-w-[calc(100vw-16px)] min-h-8 items-center gap-1 overflow-x-auto border border-black bg-white px-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)] sm:max-w-none sm:gap-2.5">
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          className={`ix-control-button min-h-[26px] min-w-[52px] shrink-0 px-2 font-medium sm:min-w-[54px] ${
            viewMode === "grid" ? "active" : "opacity-70"
          }`}
        >
          Grid
        </button>
        {viewMode === "grid" && (
          <div className="flex items-center gap-1">
            {availableLayoutOptions.map((count) => {
              const isActive = gridColumns === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => onGridColumnsChange(count)}
                  className={`ix-control-button min-h-[26px] min-w-[26px] shrink-0 px-1 font-medium ${
                    isActive ? "active" : "opacity-70"
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>
        )}
        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          className={`ix-control-button min-h-[26px] min-w-[52px] shrink-0 px-2 font-medium sm:min-w-[54px] ${
            viewMode === "list" ? "active" : "opacity-70"
          }`}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
