<template>
  <AdminLayout>
    <div>
    <h1 style="text-align: Left">Reservation List</h1>
    <ejs-grid
      :dataSource="reservations"
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
          field="reservation_id"
          headerText="ID"
          textAlign="Left"
          isPrimaryKey="true"
          :visible="false"
          width="50px"
        ></e-column>
        <e-column
          field="user_id"
          headerText="User ID"
          textAlign="Left"
        ></e-column>
        <e-column
          field="check_in_date"
          headerText="Check-in Date"
          textAlign="Left"
          format="yMd"
        ></e-column>
        <e-column
          field="check_out_date"
          headerText="Check-out Date"
          textAlign="Left"
          format="yMd"
        ></e-column>
        <e-column
          field="budget"
          headerText="Budget"
          textAlign="Left"
        ></e-column>
        <e-column
          field="region"
          headerText="Region"
          textAlign="Left"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
  </AdminLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ReservationDto } from "../../models/ReservationDto";
import {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../services/ReservationService";
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
import AdminLayout from './AdminLayout.vue'; // Correct import path

@Options({
  components: {
    "ejs-grid": GridComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective,
    AdminLayout, // Register AdminLayout
  },
  provide: {
    grid: [Resize, Sort, Page, Toolbar, Edit, Filter],
  },
})
export default class ReservationComponent extends Vue {
  reservations: ReservationDto[] = [];
  initialSort = {
    columns: [
      { field: "check_in_date", direction: "Ascending" },
      { field: "check_out_date", direction: "Ascending" },
    ],
  };
  pageSettings = { pageSizes: true, pageSize: 10 };
  filterSettings = { type: "Menu" };
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
  toast = useToast();

  async mounted() {
    this.reservations = await getAllReservations();
  }

  async onActionComplete(args: any) {
    try {
      switch (args.requestType) {
        case "save": {
          if (args.action === "add") {
            const addedReservation = await createReservation(args.data);
            if (addedReservation) {
              this.reservations.push(addedReservation);
              this.toast.success(`Reservation added successfully!`);
            }
          } else if (args.action === "edit") {
            await updateReservation(args.data.reservation_id, args.data);
            this.toast.success(`Reservation updated successfully!`);
          }

          break;
        }
        case "delete": {
          const reservation = args.data[0];
          await deleteReservation(reservation.reservation_id);
          this.toast.success(`Reservation deleted successfully!`);
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      this.toast.error(
        `Error: ${error?.response?.data?.message || error.message}`,
      );
      this.reservations = await getAllReservations();
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
