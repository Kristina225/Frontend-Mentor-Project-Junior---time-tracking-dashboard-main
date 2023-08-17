const timeframe = document.querySelectorAll('.timeframe');
const currentHours = document.querySelectorAll('.current--hours');
const dailyTimeFrame = document.querySelector('.timeframes--daily');
const weeklyTimeFrame = document.querySelector('.timeframes--weekly');
const monthlyTimeFrame = document.querySelector('.timeframes--monthly');

// TODO: Check the adding of the active class

function changeData (data, timeframe) {
   
    const timeFrames = {"daily": "Yesterday", "weekly": "Last Week", "monthly": "Last Month"}
    for (let item of data) {
        let title = item.title.toLowerCase();
        if (title.includes(' ')) {
            title = title.split(' ').join('-');
            
        } 
        document.querySelector(`.timeframe.${title}`).textContent = timeFrames[timeframe];
        document.querySelector(`.current--hours.${title}`).textContent = item.timeframes[timeframe].current;
        document.querySelector(`.previous--hours.${title}`).textContent = item.timeframes[timeframe].previous;
    }
}

function changeStyles(timeframe) {
    for (let item of ["daily", "weekly", "monthly"]) {
        document.querySelector(`.timeframes--${item}`).style.color = "#6f76c8";
    }
    document.querySelector(`.timeframes--${timeframe}`).style.color = "#fff";
}

function setInitialState(data) {
    changeStyles("weekly");
    changeData(data, "weekly")
}


fetch('./data.json').then(res => res.json()).then((data) => {
    setInitialState(data);
    dailyTimeFrame.addEventListener('click', () => {
        changeStyles("daily");
        changeData(data, "daily");
    });
    weeklyTimeFrame.addEventListener('click', () => {
        changeStyles("weekly");
        changeData(data, "weekly");
    });
    monthlyTimeFrame.addEventListener('click', () => {
        changeStyles("monthly");
        changeData(data, "monthly");
    })
});

