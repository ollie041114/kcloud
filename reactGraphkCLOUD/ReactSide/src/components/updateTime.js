export function updateTime(refetch, setTime){
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);

    refetch();
    console.log(new Date().getMilliseconds());
  }