const SocketQueryModel = {
    CONNECT:"socketConnect",
    DISCONNECT:"socketDisconnect",
    EMIT:"emit",
    FIND_NEW_NEWS:"findNewNews",
    FIND_ARCHIVED:"findArchived",
    SET_ARTICLE_ARCHIVED:"archiveArticle",
    LISTENER:"listener",
    ON_NEW_ARTICLE:"onNewArticle",
    ON_ARCHIVED:"onArchived",
    OFF_NEW_ARTICLE:"offNewArticle",
    OFF_ARCHIVED:"offArchived"
}
const SocketConsumerModel = {
    SOCKET_CONSUMER:"socketConsumer",
    CONNECT:"socketConnect",
    DISCONNECT:"socketDisconnect",
    EMIT:"emit",
    FIND_NEW_NEWS:"findNewNews",
    FIND_ARCHIVED:"findArchived",
    OFF_NEW_ARTICLE:"offNewArticle",
    OFF_ARCHIVED:"offArchived",
    SET_ARTICLE_ARCHIVED:"archiveArticle",
}

export {SocketQueryModel,SocketConsumerModel}