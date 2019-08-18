<template>
    <b-card-group deck class="mt-4">
        <b-card class="classList mb-3" v-for="classRoom in classRooms" :key="classRoom.id">
            <b-card-header class="p-0" style="background:transparent; border:none">
                <b-card-text class="classId mb-1 float-left font-weight-bold ">{{ classRoom.name }}</b-card-text>
                <b-card-text v-if="classRoom.classroomResults.length >= classRoom.max_member" class="lightBlueColor classState mb-1 float-right font-weight-bold">FULL</b-card-text>
                <b-card-text v-else class="classState mb-1 float-right font-weight-bold" v-bind:class="getStatusColor(classRoom.status)">{{ classRoom.status | capitalize }}</b-card-text>
            </b-card-header>
            <b-card-body class="p-2" style="clear:both">
                <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="classImgTrainer float-left"></b-img>
                <div class="float-left">
                    <b-card-text class="classTrainerName mb-0 ml-4">{{ classRoom.trainer.fullname }}</b-card-text>
                    <b-card-text class="classTrainerRating orangeColor ml-4">{{ getTrainerRating(classRoom.trainer.id) | ratingPrecision }} / 5.0</b-card-text>
                </div>
                <div class="classTimeline mt-5 pt-3" style="clear:both">
                    <b-card-text>Sesi Kelas</b-card-text>
                    <light-timeline :items='classRoom.classroomSessions' class="pl-4">
                        <template slot='content' slot-scope='{ item }'>
                            {{item.startTime+1 | moment("DD MMMM YYYY HH:mm")}} <span v-if="item.exam" style="color:red">(EXAM)</span>
                        </template>
                    </light-timeline>
                    <b-progress v-if="classRoom.status === 'closed'" :max="classRoom.max_member" height="1.5rem">
                        <b-progress-bar :value="0" v-bind:class="getProgressBarColor(classRoom.min_member, classRoom.max_member, classRoom.classroomResults.length, classRoom.status)" class="text-left pl-2" style="color:black">
                            <strong>0 peserta</strong>
                        </b-progress-bar>
                    </b-progress>
                    <b-progress v-else :max="classRoom.max_member" height="1.5rem">
                        <b-progress-bar :value="classRoom.classroomResults.length" v-bind:class="getProgressBarColor(classRoom.min_member, classRoom.max_member, classRoom.classroomResults.length, classRoom.status)" class="text-left pl-2" style="color:black">
                            <strong>{{ classRoom.classroomResults.length }} peserta</strong>
                        </b-progress-bar>
                    </b-progress>
                    <p class="mb-0">Ketentuan jumlah pendaftar= {{ classRoom.min_member }} - {{ classRoom.max_member }} orang</p>
                    <p class="mb-0" v-if="classRoom.classroomResults.length >= classRoom.max_member">Total permintaan buka kelas lagi = {{ classRoom.classroomRequests.length }} orang</p>
                    <span v-if="role === 'TRAINEE' && classRoom.classroomResults.length < classRoom.max_member && classRoom.status === 'open'" >
                        <b-button @click="joinClass(classRoom.id)" v-if="!isExistClassResult(classRoom.classroomResults)" variant="outline-success" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">
                            DAFTAR
                        </b-button>
                        <b-button v-else disabled class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">
                            SUDAH MENDAFTAR
                        </b-button>
                    </span>
                    <span v-if="role === 'TRAINEE' && classRoom.classroomResults.length >= classRoom.max_member && classRoom.status === 'open'">
                        <b-button @click="sendRequestOpenClass(classRoom.id)" v-if="!isExistClassRequest(classRoom.classroomRequests)" variant="outline-primary" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">
                            TETAP AJUKAN PENDAFTARAN
                        </b-button>
                        <b-button v-else disabled class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">
                            SUDAH MENGAJUKAN PENDAFTARAN
                        </b-button>
                    </span>
                    <span v-if="role === 'TRAINEE' && classRoom.status === 'closed' || role === 'TRAINEE' && classRoom.status === 'ongoing'">
                        <b-button @click="sendRequestOpenClass(classRoom.id)" v-if="!isExistClassRequest(classRoom.classroomRequests)" variant="outline-warning" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">
                            MINTA BUKA KELAS INI
                        </b-button>
                        <b-button v-else disabled class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">
                            SUDAH MENGAJUKAN PEMBUKAAN KELAS
                        </b-button>
                    </span>
                    <router-link v-if="role === 'ADMIN'" :to="{path: '/admin/all-classes/detail-class/' + classRoom.id}">
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
            role: null,
            myId: 0,
            trainerRating: 0
        }
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.toUpperCase()
        },
        ratingPrecision (value) {
            if (!value) return ''
            return value.toFixed(1)
        }
    },
    methods: {
        getStatusColor (status) {
            return {
                'greenColor': status === 'open',
                'lightOrangeColor': status === 'closed' || status === 'ongoing',
                'lightBlueColor': status === 'full'
            }
        },
        getProgressBarColor (minMember, maxMember, applier, status) {
            return {
                'redbar': applier < minMember && status === 'open',
                'bluebar': applier >= maxMember && status === 'open',
                'greenbar': applier > minMember && applier < maxMember && status === 'open',
                'yellowbar': status === 'closed' || status === 'ongoing'
            }
        },
        sendRequestOpenClass (classId) {
            this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
                classroomId: classId
            }, { withCredentials: true })
            .then(response => {
                console.log(response)
                this.$parent.getModuleDetail()
            })
            .catch(error => {
                console.log(error.response)
                var errorMessage = error.response.data.message
                if (Array.isArray(errorMessage)) {
                    var errorMessageArray = ''
                    for (var i = 0; i < errorMessage.length; i++) {
                        errorMessageArray += errorMessage[i] + ' '
                    }
                    alert(errorMessageArray)
                } else alert(errorMessage)
            })
        },
        joinClass (classId) {
            this.$axios.post('http://komatikugm.web.id:13370/classrooms/' + classId + '/_join', { withCredentials: true })
            .then(response => {
                console.log(response)
                this.$parent.getModuleDetail()
            })
            .catch(error => {
                console.log(error.response)
                var errorMessage = error.response.data.message
                if (Array.isArray(errorMessage)) {
                    var errorMessageArray = ''
                    for (var i = 0; i < errorMessage.length; i++) {
                        errorMessageArray += errorMessage[i] + ' '
                    }
                    alert(errorMessageArray)
                } else alert(errorMessage)
            })
        },
        getMyId () {
            this.$axios
            .get('http://komatikugm.web.id:13370/users/_profile', {withCredentials: true})
            .then(response => (this.myId = response.data.data.id))
            .catch(error => {
                console.log(error.response)
                var errorMessage = error.response.data.message
                if (Array.isArray(errorMessage)) {
                    var errorMessageArray = ''
                    for (var i = 0; i < errorMessage.length; i++) {
                        errorMessageArray += errorMessage[i] + ' '
                    }
                    alert(errorMessageArray)
                } else alert(errorMessage)
            })
        },
        isExistClassResult (classResult) {
            for (var i = 0; i < classResult.length; i++) {
                if (classResult[i].id === this.myId) {
                    return true
                }
            }
            return false
        },
        isExistClassRequest (classRequest) {
            for (var i = 0; i < classRequest.length; i++) {
                if (classRequest[i].user.id === this.myId) {
                    return true
                }
            }
            return false
        },
        calcRatingSummary (ratingReviews) {
            var total = 0
            for (var i = 0; i < ratingReviews.length; i++) {
                total += ratingReviews[i].value
            }
            return total / ratingReviews.length
        },
        getTrainerRating (trainerId) {
            this.$axios
            .get('http://komatikugm.web.id:13370/trainers/_ratings/' + trainerId + '?page=0&size=15', {withCredentials: true})
            .then(response => {
                var ratingReviews = response.data.data.content
                this.trainerRating = this.calcRatingSummary(ratingReviews)
            })
            .catch(error => {
                console.log(error.response)
                var errorMessage = error.response.data.message
                if (Array.isArray(errorMessage)) {
                    var errorMessageArray = ''
                    for (var i = 0; i < errorMessage.length; i++) {
                        errorMessageArray += errorMessage[i] + ' '
                    }
                    alert(errorMessageArray)
                } else alert(errorMessage)
            })
            return this.trainerRating
        }
    },
    props: ['classRooms'],
    created () {
        this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
        .then(response => {
            this.role = response.data.role
            let originalRole = response.data.role
            if (originalRole === 'TRAINER' && localStorage.roleSwitch === 'TRAINEE') {
                this.role = localStorage.roleSwitch
            } else {
                this.role = response.data.role
            }
            if (this.role === 'TRAINEE') {
                this.getMyId()
            }
        })
        .catch(error => {
            console.log(error.response)
            var errorMessage = error.response.data.message
            if (Array.isArray(errorMessage)) {
                var errorMessageArray = ''
                for (var i = 0; i < errorMessage.length; i++) {
                    errorMessageArray += errorMessage[i] + ' '
                }
                alert(errorMessageArray)
            } else alert(errorMessage)
        })
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
.line-item .item-circle{
    background: #0A87C0 !important
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
