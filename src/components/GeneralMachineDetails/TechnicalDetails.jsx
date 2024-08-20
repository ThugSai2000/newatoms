import
{
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { ActionIcon, Box, Text } from '@mantine/core';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import './CSS/machinesDetails.css'


const TechnicalDetails = (props) =>
{
  // {
  //   accessorKey: 'name',
  //   header: 'Name',
  //   enableEditing: false,
  //   size: 50,

  // },
  const { data } = props;
  const columns = []

  data.map((head) => Object.keys(head).map((key) =>
  {
    return columns.push({
      accessorKey: key,
      header: key,
      enableEditing: false,
      size: 50,

    })
  }))

  // console.log("tech details : " + JSON.stringify(columns));
  const table = useMantineReactTable({
    columns,
    data,
    initialState: { pagination: { pageSize: 3, pageIndex: 0 } },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',


    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '0',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <Text className='subcardHeading' style={{ paddingLeft: '1rem' }}>Technical Details</Text>
        {/* <Button
          onClick={() =>
          {
            table.setCreatingRow(true);

            //simplest way to open the create row modal with no default values
            //or you can pass in a row object to set default values with the `createRow` helper function
            table.setCreatingRow(
              createRow(table, {
                //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
              }),
            );
          }}
        >
          New Report
        </Button> */}
      </Box>

    ),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

        <ActionIcon
          color="orange"
          onClick={() =>
          {
            //table.setEditingRow(row);
            alert("You Want to Edit")
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={() =>
          {

            alert("You Want to Delete")
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Box>
    ),
  });
  const customRowProps = {
    sx: {
      height: '12px',
      color: 'red' // Set the height of the rows to 10px
    },
  };
  return (
    <div className='technicalDetailsContainer' style={{ backgroundColor: 'transparent' }}>

      <MantineReactTable table={table} mantineTableBodyRowProps={customRowProps} />


    </div>
  );
};


export default TechnicalDetails;

