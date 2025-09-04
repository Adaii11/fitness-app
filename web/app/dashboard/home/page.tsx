'use client';
import {motion} from 'framer-motion';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function home() {

    const calories = 1600;
    const calorieGoal = 2200;
    const caloriePercent = (calories / calorieGoal) * 100;

    const macros = [
        { label: 'Protein', value: 90, goal: 120, color: 'primary' },  // blue-500
        { label: 'Carbs', value: 180, goal: 250, color: 'secondary' },  // yellow-400
        { label: 'Fat', value: 55, goal: 70, color: '#ec4899' },       // pink-500
    ];

    const token = localStorage.getItem('token'); // wherever you stored it

    fetch('http://localhost:5000/dashboard/home', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));

    
    return (
        <div className="mt-[2rem] w-full max-w-[62.5rem] left-0 right-0 mx-auto flex flex-col">
            <h1 className="text-secondary/80 text-[2.25rem] font-semibold">Dashboard</h1>

            <div className="flex-col">
                <div className="text-center my-8 py-4 bg-[#111] border border-white/10 rounded">
                  <p className="my-[0.5rem] text-[2.25rem]">Daily Caloric Intake</p>
                    <div className="m-auto mx-[4rem] h-[3rem] bg-black h-6 rounded-full overflow-hidden">
                        <motion.div
                            className="bg-secondary h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${caloriePercent}%` }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />
                    </div>
                    <p className="mt-2 text-[1.75rem]"> {calories} / {calorieGoal}</p>
                </div>
                <div className="flex flex-row justify-between gap-6">
                    {macros.map((macro, i) => {
          const percent = (macro.value / macro.goal) * 100;
          return (
            <div key={i} className="flex-1 bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col items-center shadow-md">
              <div className="w-24 h-24 mb-4">
                <CircularProgressbarWithChildren
                  value={percent}
                  styles={buildStyles({
                    pathColor: macro.color,
                    trailColor: '#1f2937',
                  })}
                >
                  <div className="text-white font-bold text-lg">
                    {macro.value}g
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <h4 className="text-md font-medium text-gray-200">{macro.label}</h4>
              <p className="text-sm text-gray-400">{macro.value} / {macro.goal}g</p>
            </div>
          );
        })}
                </div>
            </div>

        </div>
    )
}