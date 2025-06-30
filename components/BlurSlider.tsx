import Slider from "@mui/material/Slider"
const marks = [
  {
    value: 0, 
    label: 'off',
  },
  {
    value: 25, 
    label: 'town',
  },
  {
    value: 50, 
    label: 'city',
  },
  {
    value: 75, 
    label: 'state',
  },
  {
    value: 100, 
    label: 'country',
  },
]


export default function BlurSlider() {
  const isDarkMode = typeof window !== 'undefined' &&
  document.documentElement.classList.contains('dark');
  return (
      <Slider
        aria-label="Restricted values"
        defaultValue={0}
        step={null}
        valueLabelDisplay="off"
        marks={marks}
        className='w-70'      
        sx={(theme) => ({
        '& .MuiSlider-markLabel': {
          color: 'gray',
        },
        '& .MuiSlider-markLabelActive': {
          color: 'gray',
          fontWeight: 'bold',
        }
      })}
      />
  )
}