<template>
    <b-card-group deck class="mt-4">
        <b-card class="classList mb-3" v-for="classRoom in classRooms" :key="classRoom">
            <b-card-header class="p-0" style="background:transparent; border:none">
                <b-card-text class="classId mb-1 float-left font-weight-bold ">{{ classRoom.name }}</b-card-text>
                <b-card-text class="classState mb-1 float-right font-weight-bold" v-bind:class="getStatusColor(classRoom.status)">{{ classRoom.status | capitalize }}</b-card-text>
            </b-card-header>
            <b-card-body class="p-2" style="clear:both">
                <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="classImgTrainer float-left"></b-img>
                <div class="float-left">
                    <b-card-text class="classTrainerName mb-0 ml-4">{{ classRoom.trainer.fullname }}</b-card-text>
                    <b-card-text class="classTrainerRating orangeColor ml-4">{{ classRoom.trainer.trainerRatings }} / 5.0</b-card-text>
                </div>
                <div class="classTimeline mt-5 pt-3" style="clear:both">
                    <b-card-text>Sesi Kelas</b-card-text>
                    <light-timeline :items='classRoom.classroomSessions' class="pl-4">
                        <template slot='content' slot-scope='{ item }'>
                            {{item.startTime | moment("DD MMMM YYYY hh:mm:ss")}} <span v-if="item.exam" style="color:red">(EXAM)</span>
                        </template>
                    </light-timeline>
                    <b-progress :max="classRoom.max_member" height="1.5rem">
                        <b-progress-bar :value="classRoom.classroomResults.length" v-bind:class="getProgressBarColor(classRoom.min_member, classRoom.max_member, classRoom.classroomResults.length, classRoom.status)" class="text-left pl-2" style="color:black">
                            <strong>{{ classRoom.classroomResults.length }} peserta</strong>
                        </b-progress-bar>
                    </b-progress>
                    <p class="mb-0">Ketentuan jumlah pendaftar= {{ classRoom.min_member }} - {{ classRoom.max_member }} orang</p>
                    <p class="mb-0" v-if="classRoom.classroomResults.length > classRoom.max_member">Total permintaan buka kelas lagi = {{ classRoom.classroomRequests.length }} orang</p>
                    <b-button v-if="role === 'TRAINEE' && classRoom.classroomResults.length < classRoom.max_member && classRoom.status === 'open'" variant="outline-dark" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">DAFTAR</b-button>
                    <b-button @click="sendRequestOpenClass(classRoom.id)" v-if="role === 'TRAINEE' && classRoom.classroomResults.length >= classRoom.max_member && classRoom.status === 'full'" variant="outline-dark" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">TETAP AJUKAN PENDAFTARAN</b-button>
                    <b-button @click="sendRequestOpenClass(classRoom.id)" v-if="role === 'TRAINEE' && classRoom.status === 'close'" variant="outline-dark" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">MINTA BUKA KELAS INI</b-button>
                    <router-link v-if="role === ''" :to="{path: '/admin/all-classes/detail-class/' + classRoom.id}">
                        <b-button variant="outline-dark" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">EDIT</b-button>
                    </router-link>
                </div>
            </b-card-body>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
    data () {
        return {
            role: null
        }
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.toUpperCase()
        }
    },
    methods: {
        getStatusColor (status) {
            return {
                'greenColor': status === 'open',
                'lightOrangeColor': status === 'close',
                'lightBlueColor': status === 'full'
            }
        },
        getProgressBarColor (minMember, maxMember, applier, status) {
            return {
                'redbar': applier < minMember && status === 'open',
                'bluebar': applier >= maxMember && status === 'open',
                'greenbar': applier > minMember && applier < maxMember && status === 'open',
                'yellowbar': status === 'close'
            }
        },
        sendRequestOpenClass (classId) {
            this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
                classroomId: classId
            }, { withCredentials: true })
            .then(response => {
                console.log(response)
                window.location.reload()
                })
            .catch(error => console.log(error))
        }
    },
    props: ['classRooms'],
    created () {
        this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
            .then(response => {
                let originalRole = response.data.role
                if (originalRole === 'TRAINER' && localStorage.role === 'TRAINEE') {
                    this.role = localStorage.role
                } else {
                    this.role = response.data.role
                }
            })
            .catch(error => { console.log(error) })
        alert(this.role)
    }
}
</script>

<style scoped>
.classList{
  max-width: calc(50% - 30px);
  min-width: calc(50% - 30px);
}
.classList .classId{
    font-size: 22px;
}
.classList .classState{
    font-size: 14px
}
.classList .classImgTrainer{
    height: 53px;
    width: 53px
}
.classList .classTrainerName, .classList .classTrainerRating{
    font-size: 18px
}
.line-container::after{
    left:0.5rem !important;
    border-left: 2px solid #0A87C0
}
.line-item{
    padding: 5px !important
}
.item-circle{
    border-color: #0A87C0 !important
}
.redbar{
    background: #960900
}
.bluebar{
    background: #0A87C0
}
.greenbar{
    background: #25975F
}
.yellowbar{
    background: #FCBF49
}
</style>
