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
            field="user_name"
            headerText="User Name"
            textAlign="Left"
          ></e-column>
          <e-column
            field="trip_start"
            headerText="Trip Start Date"
            textAlign="Left"
            format="yMd"
          ></e-column>
          <e-column
            field="trip_end"
            headerText="Trip End Date"
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
          <e-column
            field="stay_duration"
            headerText="Stay Duration"
            textAlign="Left"
          ></e-column>
          <e-column
            field="exp_1"
            headerText="Experience 1"
            textAlign="Left"
          ></e-column>
          <e-column
            field="exp_1_rating"
            headerText="Experience 1 Rating"
            textAlign="Left"
          ></e-column>
          <e-column
            field="exp_2"
            headerText="Experience 2"
            textAlign="Left"
          ></e-column>
          <e-column
            field="exp_2_rating"
            headerText="Experience 2 Rating"
            textAlign="Left"
          ></e-column>
          <e-column
            field="exp_3"
            headerText="Experience 3"
            textAlign="Left"
          ></e-column>
          <e-column
            field="exp_3_rating"
            headerText="Experience 3 Rating"
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
export default class ReservationComponent extends Vue {
  reservations: ReservationDto[] = [];
  initialSort = {
    columns: [
      { field: "trip_start", direction: "Ascending" },
      { field: "trip_end", direction: "Ascending" },
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
