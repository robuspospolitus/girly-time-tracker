import { useCategoryContext, useCategoriesContext } from './Utensils/CategoryContext';
import { useEffect, Dispatch, SetStateAction, memo, useMemo } from 'react';
import axios from 'axios';
import SelectCategory from './Utensils/SelectCategory';
import '../Styles/Statistics.scss';
import '../Styles/List.scss';

type StatProps = {
    items: { [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>},
    setItems: Dispatch<SetStateAction<{ [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>}>>
}
const Statistics = memo(({ items, setItems }:StatProps) => {
    const [categories] = useCategoriesContext();

    useEffect(() => {
        axios.get("http://localhost:5000/api/data").then((response) => {
            setItems(response.data);
        }).catch((err) => {throw new Error(`Getting data from the server has failed: ${err}`)});
    }, []);

    // Total time spent on all activities
    const totalTime = useMemo(() => {
        let totalTime = [0,0,0];
        categories.forEach(cat => {
            const length = items[cat] ? items[cat].length : 0;
            for (let i = 0; i < length; i++){
                totalTime[0] = totalTime[0] + items[cat][i].hours + (items[cat][i].minutes /60);
            }
        });
        totalTime[1] = Math.floor(totalTime[0]);
        totalTime[2] = Math.round((totalTime[0] - totalTime[1])*60);
        totalTime[0] = parseFloat(totalTime[0].toFixed(2));
        return totalTime;
    }, [items])

    // Most active category (with most time spent)
    const mostActiveCat = useMemo(() => {
        let top = [[0,''], [0,''], [0,'']];
        categories.forEach(cat => {
            let monthsTotal = 0;
            const length = items[cat] ? items[cat].length : 0;
            for (let i = 0; i < length; i++){
                monthsTotal = monthsTotal + items[cat][i].hours + (items[cat][i].minutes /60);
            }
            monthsTotal = parseFloat(monthsTotal.toFixed(2));
            top.push([monthsTotal, cat]);
        });
        const sortedArray = top.sort((a:(number|string)[], b:(number|string)[]) => { return (b[0] as number) - (a[0] as number); });
        return sortedArray;
    }, [items])

    // Most active month (with most time spent)
    const mostActiveMonth = useMemo(() => {
        let months = [''];
        categories.forEach(cat => {
            let monthnum = 0;
            const length = items[cat] ? items[cat].length : 0;
            for (let i = 0; i < length; i++){
                monthnum = parseInt(items[cat][i].date[3] + items[cat][i].date[4]);
                let month = '';
                switch(monthnum) {
                    case 1: month = 'january'; break;
                    case 2: month = 'february'; break;
                    case 3: month = 'march'; break;
                    case 4: month = 'april'; break;
                    case 5: month = 'may'; break;
                    case 6: month = 'june'; break;
                    case 7: month = 'july'; break;
                    case 8: month = 'august'; break;
                    case 9: month = 'september'; break;
                    case 10: month = 'october'; break;
                    case 11: month = 'november'; break;
                    case 12: month = 'december'; break;
                }
                months.push(month);
            }
        });
        return mostFrequentElement(months);
    }, [items])

    return(
        <div id="statistics-page-wrapper">
            <div className='stat-title'>
                <h2>Statistics</h2>
                <p className='date'>20/02/2020</p>
            </div>
            <div className='separator'/>
            <div id="statistics-up">
                <section className="blur-wrap statup">

                </section>
                <section className="blur-wrap statup">
                    <p>Total time: {totalTime[1]}h {totalTime[2]}m, {totalTime[0]}h</p>
                    <p>Most active month: {mostActiveMonth}</p>
                    <p>Most active category: {mostActiveCat[0][1]}</p>
                    <p>Top 3 categories:</p>
                    <ol>
                        <li>{mostActiveCat[0][1]} — {mostActiveCat[0][0]}h</li>
                        <li>{mostActiveCat[1][1]} — {mostActiveCat[1][0]}h</li>
                        <li>{mostActiveCat[2][1]} — {mostActiveCat[2][0]}h</li>
                    </ol>
                </section>
            </div>
            <section id="statistics-information" className='blur-wrap'>
                <SelectCategory />
                <CategoryStats items={items}/>
            </section>
        </div>
    )
})
export default Statistics;

// IN-PROGRESS
type catStatsProp = {
    items: { [key: string]: Array<{id: string, date: string, hours: number, minutes: number}>},
}
const CategoryStats = ({items}:catStatsProp) => {
    const [category] = useCategoryContext();
    const length = items[category] ? items[category].length : 0;

    // Total time spent on an activity
    const totalTime = useMemo(() => {
        let totalTime = [0,0,0];
        for (let i = 0; i < length; i++) {
            totalTime[0] = totalTime[0] + items[category][i].hours + (items[category][i].minutes /60);
        }
        totalTime[1] = Math.floor(totalTime[0]);
        totalTime[2] = Math.round((totalTime[0] - totalTime[1])*60)
        totalTime[0] = parseFloat(totalTime[0].toFixed(2));
        return totalTime;
    }, [items, category])

    // Date of the first and last added time
    const addedTimeDate = useMemo(() => {
        const length = items[category] ? items[category].length - 1 : 0;
        const date = [category ? items[category][length].date : 'none', category ? items[category][0].date : 'none']
        return date;
    }, [items, category])

    // Most active month of the category
    const mostActiveMonth = useMemo(() => {
        let months = [''];
        for (let i = 0; i < length; i++) {
            const monthnum = parseInt(items[category][i].date[3] + items[category][i].date[4]);
            let month = '';
            switch(monthnum) {
                case 1: month = 'january'; break;
                case 2: month = 'february'; break;
                case 3: month = 'march'; break;
                case 4: month = 'april'; break;
                case 5: month = 'may'; break;
                case 6: month = 'june'; break;
                case 7: month = 'july'; break;
                case 8: month = 'august'; break;
                case 9: month = 'september'; break;
                case 10: month = 'october'; break;
                case 11: month = 'november'; break;
                case 12: month = 'december'; break;
            }
            months.push(month);
        }
        return mostFrequentElement(months);
    }, [items, category])

    // Most active day of the week of the category
    const mostActiveDay = useMemo(() => {
        let days = [''];
        for (let i = 0; i < length; i++) {
            let item = items[category][i].date;
            let daynumber = new Date(item.split('/').reverse().join('-')).getDay();
            switch(daynumber) {
                case 1: days.push('monday'); break;
                case 2: days.push('tuesday'); break;
                case 3: days.push('wednesday'); break;
                case 4: days.push('thursday'); break;
                case 5: days.push('friday'); break;
                case 6: days.push('saturday'); break;
                case 7: days.push('sunday'); break;
            }
        }
        return mostFrequentElement(days);
    }, [items, category])

    // Average
    const averagePerMonth = useMemo(() => {
        let averageTime = [0];
        let months = 1;
        for (let i = 1; i < length; i++) {
            let item = items[category][i].date;
            let lastitem = items[category][i-1].date;
            let month = new Date(item.split('/').reverse().join('-')).getMonth().toString() + new Date(item.split('/').reverse().join('-')).getMonth().toString();
            let lastMonth = new Date(lastitem.split('/').reverse().join('-')).getMonth().toString() + new Date(lastitem.split('/').reverse().join('-')).getMonth().toString();
            if(month !== lastMonth) months += 1;
        }
        for (let i = 0; i < length; i++) {
            averageTime[0] = averageTime[0] + items[category][i].hours + (items[category][i].minutes /60);
        }
        averageTime[0] = parseFloat((averageTime[0] / months).toFixed(2));
        return averageTime;
    }, [items, category])

    return (
        <>
        {category && <>
            <span style={{margin: '10px', fontSize: '20px'}} >Total hours: {totalTime[1]}h {totalTime[2]}m, {totalTime[0]}h</span>
            <span>Last added time date: <i>{addedTimeDate[1]}</i></span>
            <span>First added time date: <i>{addedTimeDate[0]}</i></span>
            <span>Most active month: <i>{mostActiveMonth}</i></span>
            <span>Most active day of the week: <i>{mostActiveDay}</i></span>
            <span style={{marginTop: '8px'}} >Average spent hours per month: <i>{averagePerMonth[0]}</i></span>
            <span>Average spent hours per week: <i>in-progress</i></span>
            <span>Average spent hours per day: <i>in-progress</i></span>
        </>}
        </>
    )
}

function mostFrequentElement<T>(arr: T[]): T {
    const counts: Record<string, number> = {};
    arr.forEach(el => { const key = String(el); counts[key] = (counts[key] || 0) + 1;});
    return arr.reduce((most, el) => (counts[String(el)] > counts[String(most)] ? el : most));
}
