import React from "react";

import Login from "./views/login/Login";
import UserList from "./views/user/UserList";
import RowUserAddUpdate from "./views/user/RowUserAddUpdate";
import EditSettings from "./views/settings/EditSettings";
import UserAddUpdate from "./views/user/UserAddUpdate";
import ClassxAddUpdate from "./views/classx/ClassxAddUpdate";
import ClassxList from "./views/classx/ClassxList";

import StudentList from "./views/student/StudentList";
import StudentAddUpdate from "./views/student/StudentAddUpdate";
import ParentList from "./views/parent/ParentList";
import ParentAddUpdate from "./views/parent/ParentAddUpdate";
import TeacherAddUpdate from "./views/teacher/TeacherAddUpdate";
import TeacherList from "./views/teacher/TeacherList";
import MatierList from "./views/matier/MatierList";
import MatierAddUpdate from "./views/matier/MatierAddUpdate";
import TeacherMatierAddUpdate from "./views/teachermatier/TeacherMatierAddUpdate";
import TeacherMatier from "./views/teachermatier/TeacherMatier";
import AgendaList from "./views/agenda/AgendaList";
import AgendaAddUpdate from "./views/agenda/AgendaAddUpdate";
import AttendanceList from "./views/attendance/AttendanceList";
import AttendanceAddUpdate from "./views/attendance/AttendanceAddUpdate";
import CalendarList from "./views/calendar/CalendarList";
import CalendarAddUpdate from "./views/calendar/CalendarAddUpdate";
import ExamList from "./views/exam/ExamList";
import ExamAddUpdate from "./views/exam/ExamAddUpdate";
import GradeList from "./views/grade/GradeList";
import GradeAddUpdate from "./views/grade/GradeAddUpdate";
import NewsList from "./views/news/NewsList";
import NewsAddUpdate from "./views/news/NewsAddUpdate";
import ItemUpload from "./views/uploader/ItemUpload";
import BannerAddUpdate from "./views/banner/BannerAddUpdate";
import BannerList from "./views/banner/BannerList";
import SchoolList from "./views/school/SchoolList";
import SchoolAddUpdate from "./views/school/SchoolAddUpdate";
import FeesList from "./views/fees/FeesList";
import FeesTypeList from "./views/feestype/FeesTypeList";
import FeesAddUpdate from "./views/fees/FeesAddUpdate";
import FeesTypeAddUpdate from "./views/feestype/FeesTypeAddUpdate";
import HealthTypeList from "./views/healthtype/HealthTypeList";
import HealthAddUpdate from "./views/health/HealthAddUpdate";
import HealthTypeAddUpdate from "./views/healthtype/HealthTypeAddUpdate";
import HealthList from "./views/health/HealthList";
import ManagerList from "./views/manager/ManagerList";
import ManagerTypeList from "./views/managertype/ManagerTypeList";
import ManagerTypeAddUpdate from "./views/managertype/ManagerTypeAddUpdate";
import NotificationList from "./views/notification/NotificationList";
import NotificationAddUpdate from "./views/notification/NotificationAddUpdate";
import BookAddUpdate from "./views/book/BookAddUpdate";
import BookList from "./views/book/BookList";
import DepartmentList from "./views/department/DepartmentList";
import DepartmentAddUpdate from "./views/department/DepartmentAddUpdate";
import SectionList from "./views/section/SectionList";
import SectionAddUpdate from "./views/section/SectionAddUpdate";
import CertificateList from "./views/certificate/CertificateList";
import CertificateAddUpdate from "./views/certificate/CertificateAddUpdate";
import Studentclassprogress from "./views/studentclassprogress/Studentclassprogress";
import StudentclassprogressAddUpdate from "./views/studentclassprogress/StudentclassprogressAddUpdate";
import ScheduleList from "./views/schedule/ScheduleList";
import ScheduleAddUpdate from "./views/schedule/ScheduleAddUpdate";
import AccountList from "./views/account/AccountList";
import AccountAddUpdate from "./views/account/AccountAddUpdate";
import FormList from "./views/form/FormList";
import FromResponseList from "./views/form/FromResponseList";
import FormAddUpdate from "./views/form/FormAddUpdate";
import strings from "./core/translate";
import {Memory} from "./core/Memory";
import LogList from "./views/report/LogList";
import AttendanceReport from "./views/report/AttendanceReport";
import ChartsList from "./views/report/ChartsList";
import ClassReport from "./views/report/ClassReport";
import HealthReport from "./views/report/HealthReport";
import ParentReport from "./views/report/ParentReport";
import PayrollReport from "./views/report/PayrollReport";
import ResultReport from "./views/report/ResultReport";
import StudentInformation from "./views/report/StudentInformation";
import FormUpload from "./views/form/FormUpload";












const checklang =  Memory.getItem("lang");
if(checklang=="ar"){
    document.body.classList.add('langar');
    strings.setLanguage('ar');
}

if(checklang=="kr"){
    document.body.classList.add('langar');
    strings.setLanguage('kr');
}
if(checklang=="en"){
    document.body.classList.remove('langar');
    strings.setLanguage('en');
}



let routes = [

    {
        path: "/admini",
        name: strings.managergmgnet,
        classItem:"menuItem",
        allow : ["admin","it","manager","assistant","educational guide"],
        icon: "nc-icon nc-paper",
        //  menu: true,
        layout: "/admin",
        collapse: true,
        state: "pagesCollapseo3",
        views: [
            {
                path: "/news",
                name: strings.news,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide"],
                component: NewsList,
                layout: "/admin"
            },

            {
                path: "/university",
                name: strings.uni,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide"],
                component: SchoolList,
                layout: "/admin"
            },

            {
                path: "/department",
                name: "Academic",
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide"],
                component: DepartmentList,
                layout: "/admin"
            },

            {
                path: "/section",
                name: strings.section,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide"],
                component: SectionList,
                layout: "/admin"
            },

            {
                path: "/certificate",
                name: strings.certificate,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide"],
                component: CertificateList,
                layout: "/admin"
            },



        ]
    },

    {
        path: "/family",
        name: strings.family,
        classItem:"menuItem",
        allow : ["admin","it","manager","assistant","educational guide","secretary"],
        icon: "nc-icon nc-paper",
        //  menu: true,
        layout: "/admin",
        collapse: true,
        state: "pagesCollapse3iss",
        views: [
            {
                path: "/student",
                name: strings.student,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide","secretary"],
                component: StudentList,
                layout: "/admin"
            },
            {
                path: "/grade",
                name: "grade list",
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide","secretary"],

                component: GradeList,
                layout: "/admin"
            },

        ]
    },


    {
        path: "/teachers",
        name: strings.teachers,
        classItem:"menuItem",
        allow : ["admin","it","manager","assistant","educational guide","secretary","supervisor","teacher","coordinator"],
        icon: "nc-icon nc-paper",
        //  menu: true,
        layout: "/admin",
        collapse: true,
        state: "pagesCollapse3isis",
        views: [
            {
                path: "/teacher",
                name: strings.teachers,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide","secretary","supervisor","teacher","coordinator"],
                component: TeacherList,
                layout: "/admin"
            },
            {
                path: "/matier",
                name: strings.matx,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide","supervisor","teacher","coordinator"],
                component: MatierList,
                layout: "/admin"
            },
            {
                path: "/teachermatier",
                name: strings.teamat,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide","supervisor","teacher","coordinator"],
                component: TeacherMatier,
                layout: "/admin"
            },

        ]
    },









    {
        path: "/classes",
        name: strings.classx,
        classItem:"menuItem",
        allow : ["admin","it","manager","assistant","educational guide","supervisor","teacher","coordinator"],
        icon: "nc-icon nc-paper",
        //  menu: true,
        layout: "/admin",
        collapse: true,
        state: "pagesCollapsejji3",
        views: [

            {
                path: "/classx",
                name: strings.classx,
                menu: true,
                allow : ["admin","it","manager","assistant","educational guide","supervisor","teacher","coordinator"],
                component: ClassxList,
                layout: "/admin"
            },



        ]
    },




    {
        path: "/banner/add",
        name: "add banner",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: BannerAddUpdate,
        layout: "/admin"
    },
    {
        path: "/banner/edit/:id",
        name: "edit banner",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: BannerAddUpdate,
        layout: "/admin"
    },

    {
        path: "/book/add",
        name: "add book",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: BookAddUpdate,
        layout: "/admin"
    },
    {
        path: "/book/edit/:id",
        name: "edit book",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: BookAddUpdate,
        layout: "/admin"
    },


    {
        path: "/healthtype/add",
        name: "add healthtype",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: HealthTypeAddUpdate,
        layout: "/admin"
    },
    {
        path: "/healthtype/edit/:id",
        name: "edit healthtype",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: HealthTypeAddUpdate,
        layout: "/admin"
    },

    {
        path: "/health/add",
        name: "add health",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: HealthAddUpdate,
        layout: "/admin"
    },
    {
        path: "/health/edit/:id",
        name: "edit health",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: HealthAddUpdate,
        layout: "/admin"
    },

    {
        path: "/fees/add",
        name: "add fees",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: FeesAddUpdate,
        layout: "/admin"
    },
    {
        path: "/fees/edit/:id",
        name: "edit fees",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: FeesAddUpdate,
        layout: "/admin"
    },


    {
        path: "/feestype/add",
        name: "add feestype",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: FeesTypeAddUpdate,
        layout: "/admin"
    },
    {
        path: "/feestype/edit/:id",
        name: "edit feestype",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: FeesTypeAddUpdate,
        layout: "/admin"
    },

    {
        path: "/university/add",
        name: "add university",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: SchoolAddUpdate,
        layout: "/admin"
    },
    {
        path: "/university/edit/:id",
        name: "edit university",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: SchoolAddUpdate,
        layout: "/admin"
    },



    {
        path: "/news/edit/:id",
        name: "edit news",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: NewsAddUpdate,
        layout: "/admin"
    },

    {
        path: "/news/add",
        name: "add news",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: NewsAddUpdate,
        layout: "/admin"
    },


    {
        path: "/grade/edit/:id",
        name: "edit grade",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: GradeAddUpdate,
        layout: "/admin"
    },




    {
        path: "/grade/add",
        name: "add grade",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: GradeAddUpdate,
        layout: "/admin"
    },

    {
        path: "/account/edit/:id",
        name: "edit account",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: AccountAddUpdate,
        layout: "/admin"
    },

    {
        path: "/account/add",
        name: "add account",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: AccountAddUpdate,
        layout: "/admin"
    },





    {
        path: "/exam/edit/:id",
        name: "edit exam",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ExamAddUpdate,
        layout: "/admin"
    },

    {
        path: "/exam/add",
        name: "add exam",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ExamAddUpdate,
        layout: "/admin"
    },



    {
        path: "/form/edit/:id",
        name: "edit form",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: FormAddUpdate,
        layout: "/admin"
    },
    {
        path: "/form/add",
        name: "add form",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: FormAddUpdate,
        layout: "/admin"
    },
    {
        path: "/calendar/edit/:id",
        name: "edit calendar",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: CalendarAddUpdate,
        layout: "/admin"
    },

    {
        path: "/calendar/add",
        name: "add calendar",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: CalendarAddUpdate,
        layout: "/admin"
    },


    {
        path: "/department/edit/:id",
        name: "edit department",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: DepartmentAddUpdate,
        layout: "/admin"
    },

    {
        path: "/department/add",
        name: "add department",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: DepartmentAddUpdate,
        layout: "/admin"
    },

    {
        path: "/section/edit/:id",
        name: "edit section",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: SectionAddUpdate,
        layout: "/admin"
    },

    {
        path: "/section/add",
        name: "add section",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: SectionAddUpdate,
        layout: "/admin"
    },

    {
        path: "/certificate/edit/:id",
        name: "edit certificate",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: CertificateAddUpdate,
        layout: "/admin"
    },

    {
        path: "/certificate/add",
        name: "add certificate",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: CertificateAddUpdate,
        layout: "/admin"
    },

    {
        path: "/studentclassprogress/edit/:id",
        name: "edit studentclassprogress",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: StudentclassprogressAddUpdate,
        layout: "/admin"
    },

    {
        path: "/studentclassprogress/add",
        name: "add studentclassprogress",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: StudentclassprogressAddUpdate,
        layout: "/admin"
    },


    {
        path: "/schedule/edit/:id",
        name: "edit schedule",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ScheduleAddUpdate,
        layout: "/admin"
    },

    {
        path: "/schedule/add",
        name: "add schedule",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ScheduleAddUpdate,
        layout: "/admin"
    },



    {
        path: "/attendance/edit/:id",
        name: "edit attendance",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: AttendanceAddUpdate,
        layout: "/admin"
    },

    {
        path: "/attendance/add",
        name: "add attendance",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: AttendanceAddUpdate,
        layout: "/admin"
    },









    {
        path: "/agenda/edit/:id",
        name: "edit agenda",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: AgendaAddUpdate,
        layout: "/admin"
    },

    {
        path: "/agenda/add",
        name: "add agenda",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: AgendaAddUpdate,
        layout: "/admin"
    },


    {
        path: "/matier/edit/:id",
        name: "edit matier",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: MatierAddUpdate,
        layout: "/admin"
    },

    {
        path: "/matier/add",
        name: "add matier",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: MatierAddUpdate,
        layout: "/admin"
    },

    {
        path: "/teachermatier/edit/:id",
        name: "edit teachermatier",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: TeacherMatierAddUpdate,
        layout: "/admin"
    },

    {
        path: "/teachermatier/add",
        name: "add teachermatier",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: TeacherMatierAddUpdate,
        layout: "/admin"
    },


    {
        path: "/parent/edit/:id",
        name: "edit parent",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ParentAddUpdate,
        layout: "/admin"
    },

    {
        path: "/parent/add",
        name: "add parent",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ParentAddUpdate,
        layout: "/admin"
    },


    {
        path: "/classx/edit/:id",
        name: "edit classx",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ClassxAddUpdate,
        layout: "/admin"
    },

    {
        path: "/classx/add",
        name: "add classx",
        menu: false,
        // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: ClassxAddUpdate,
        layout: "/admin"
    },

    {
        path: "/student/edit/:id",
        name: "edit student",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: StudentAddUpdate,
        layout: "/admin"
    },

    {
        path: "/student/add",
        name: "add student",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: StudentAddUpdate,
        layout: "/admin"
    },

    {
        path: "/notification/edit/:id",
        name: "edit notification",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: NotificationAddUpdate,
        layout: "/admin"
    },

    {
        path: "/notification/add",
        name: "add notification",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: NotificationAddUpdate,
        layout: "/admin"
    },

    {
        path: "/teacher/edit/:id",
        name: "edit teacher",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: TeacherAddUpdate,
        layout: "/admin"
    },

    {
        path: "/teacher/add",
        name: "add teacher",
        menu: false,
        icon: "nc-icon nc-settings-gear-65",
        component: TeacherAddUpdate,
        layout: "/admin"
    },



    {
        path: "/login",
        name: "Login",
        mini: "L",
        menu: false,
        component: Login,
        layout: "/auth"
    },





    {
        path: "/user",
        name: "User",
      //  menu: true,
      //  allow : ["admin"],
        icon: "nc-icon nc-badge",
        component: UserList,
        layout: "/admin"
    },


    {
        path: "/user/edit/:id",
        name: "User manager",
        menu: false,
        icon: "nc-icon nc-single-02",
        component: RowUserAddUpdate,
        layout: "/admin"
    },
    {
        path: "/manager/edit/:id",
        name: "Edit manager",
        menu: false,
        icon: "nc-icon nc-single-02",
        component: UserAddUpdate,
        layout: "/admin"
    },
    {
        path: "/manager/add",
        name: "add manager",
        menu: false,
        icon: "nc-icon nc-single-02",
        component: UserAddUpdate,
        layout: "/admin"
    },


    {
        path: "/managertype/edit/:id",
        name: "Edit manager type",
        menu: false,
        icon: "nc-icon nc-single-02",
        component: ManagerTypeAddUpdate,
        layout: "/admin"
    },
    {
        path: "/managertype/add",
        name: "add manager type",
        menu: false,
        icon: "nc-icon nc-single-02",
        component: ManagerTypeAddUpdate,
        layout: "/admin"
    },






    {
        path: "/settings",
        name: "Settings",
        menu: false,
       // allow : ["admin"],
        icon: "nc-icon nc-settings-gear-65",
        component: EditSettings,
        layout: "/admin"
    },


    {
        path: "/manager",
        name: strings.maangx,
        menu: true,
        allow : ["admin","it","manager","assistant","educational guide"],
        icon: "nc-icon nc-badge",
        component: ManagerList,
        layout: "/admin"
    },

    {
        path: "/managertype",
        name: strings.managtype,
       menu: true,
        allow : ["admin","it"],
        icon: "nc-icon nc-badge",
        component: ManagerTypeList,
        layout: "/admin"
    },









];



export default routes;
