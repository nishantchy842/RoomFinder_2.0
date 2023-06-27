import { Select } from "antd";

const Filter = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div>
            <Select
                defaultValue="Budget"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },

                ]}
            />
        </div>
    )
}

export default Filter
