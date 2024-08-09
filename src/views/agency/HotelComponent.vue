<!-- src/views/agency/HotelComponent.vue -->
<template>
  <AdminLayout>
    <template v-slot>
      <div>
        <h1 style="text-align: left">Hotel List</h1>
        <ejs-grid
          :dataSource="hotels"
          :allowResizing="true"
          :allowSorting="true"
          :allowFiltering="true"
          allowPaging="true"
          :filterSettings="filterSettings"
          :editSettings="editSettings"
          :toolbar="toolbar"
          :sortSettings="initialSort"
          :pageSettings="pageSettings"
          @actionComplete="onActionComplete"
        >
          <e-columns>
            <e-column
              field="hotel_id"
              headerText="ID"
              textAlign="left"
              isPrimaryKey="true"
              :visible="false"
              width="50px"
            ></e-column>
            <e-column field="name" headerText="Name" textAlign="left"></e-column>
            <e-column field="location" headerText="Location" textAlign="left"></e-column>
            <e-column field="rating" headerText="Rating" textAlign="left"></e-column>
          </e-columns>
        </ejs-grid>
      </div>
    </template>
  </AdminLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { HotelDto } from "../../models/HotelDto";
import {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../../services/HotelService";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Filter,
  Page,
  Sort,
  Toolbar,
  Edit,
  Resize,
} from "@syncfusion/ej2-vue-grids";
import { useToast } from "vue-toastification";
import AdminLayout from './AdminLayout.vue'; 

@Options({
  components: {
    "ejs-grid": GridComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective,
    AdminLayout, 
  },
  provide: {
    grid: [Resize, Sort, Page, Toolbar, Edit, Filter],
  },
})
export default class HotelComponent extends Vue {
  hotels: HotelDto[] = [];
  initialSort = {
    columns: [
      { field: "name", direction: "Ascending" },
      { field: "location", direction: "Ascending" },
    ],
  };
  pageSettings = { pageSizes: true, pageSize: 10 };
  filterSettings = { type: "Menu" };
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
  toast = useToast();

  async mounted() {
    this.hotels = await getAllHotels();
  }

  async onActionComplete(args: any) {
    try {
      switch (args.requestType) {
        case "save": {
          if (args.action === "add") {
            const addedHotel = await createHotel(args.data);
            if (addedHotel) {
              this.hotels.push(addedHotel);
              this.toast.success(`Hotel added successfully!`);
            }
          } else if (args.action === "edit") {
            await updateHotel(args.data.hotel_id, args.data);
            this.toast.success(`Hotel updated successfully!`);
          }

          break;
        }
        case "delete": {
          const hotel = args.data[0];
          await deleteHotel(hotel.hotel_id);
          this.toast.success(`Hotel deleted successfully!`);
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      this.toast.error(
        `Error: ${error?.response?.data?.message || error.message}`,
      );
      this.hotels = await getAllHotels();
    }
  }
}
</script>

<style scoped>
.experience-selection {
  border: 1px solid black;
  padding: 20px;
}
</style>
