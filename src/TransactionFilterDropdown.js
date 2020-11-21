import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



export const TransactionFilterDropdown = ({options, selectedOption, onChange}) => (
  <FormControl style={{minWidth: 300}}>
    <InputLabel id="filter-select">Filter by...</InputLabel>
    <Select
      labelId="filter-select"
      value={selectedOption}
      renderValue={() => selectedOption ? selectedOption.label : null}
      onChange={onChange}
    >
      { options.map(option => <MenuItem value={option}>{option.label}</MenuItem>)}
    </Select>
  </FormControl>
);

